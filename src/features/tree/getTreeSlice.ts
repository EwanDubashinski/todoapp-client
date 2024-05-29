import { TreeData, TreeState, PendingAction, RejectedAction, DraftableEntityState } from './treetypes';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import type { SerializedError, UnknownAction, CreateSliceOptions } from '@reduxjs/toolkit';

import axios from 'axios';
import TreeItemsServerActions from './TreeItemsServerActions';


export default function getTreeSlice<T extends TreeData>(name: string) {
   type StateArgument = DraftableEntityState<T, T["id"]> & TreeState<T>;

   const emptyEntity: T = { id: -1, childOrder: -1 } as T;

   const treeAdapter = createEntityAdapter<T>();
   const treeState: TreeState<T> = {
      loadingStatus: 'idle',
      error: null,
      showEditModal: false,
      showDeleteModal: false,
      currentTreeItemData: null,
   };
   const initialState = treeAdapter.getInitialState(treeState);
   const fetchTreeItems = createAsyncThunk(
      `${name}/fetchTreeItems`,
      async () => {
         const response = await axios.get(TreeItemsServerActions.FETCH);
         return response.data;
      }
   );

   const createTreeItem = createAsyncThunk(
      `${name}/create`,
      async (treeItemData: T) => {
         const response = await axios.post(TreeItemsServerActions.CREATE, treeItemData);
         return response.data;
      }
   );
   const updateTreeItem = createAsyncThunk(
      `${name}/update`,
      async (treeItemData: T) => {
         const response = await axios.put(TreeItemsServerActions.UPDATE, treeItemData);
         return response.data;
      }
   );
   const updateTreeItems = createAsyncThunk(
      `${name}/updateMany`,
      async (treeItemDatas: T[]) => {
         const response = await axios.put(TreeItemsServerActions.UPDATE_MANY, treeItemDatas);
         return response.data;
      }
   );
   const deleteTreeItem = createAsyncThunk(
      `${name}/delete`,
      async (treeItemData: T) => {
         const response = await axios.post(TreeItemsServerActions.DELETE, treeItemData);
         return response.data;
      }
   );
   const isPendingAction = (action: UnknownAction): action is PendingAction => {
      return typeof action.type === 'string' && action.type.endsWith('/pending')
   }
   const isRejectedAction = (action: UnknownAction): action is RejectedAction => {
      return typeof action.type === 'string' && action.type.endsWith('/rejected')
   }

   const treeSliceData: CreateSliceOptions = {
      name: name,
      initialState,
      reducers: {
         updatePosition: (state: StateArgument, { payload }) => {
            if (payload.treeItem.parentId !== payload.parentIdNew) {
               const treeItems: TreeData[] = Object.values(state.entities)
                  .filter(item => item.childOrder >= payload.childOrderNew &&
                     item.parentId === payload.parentIdNew)
                  .map(item => ({ ...item, childOrder: item.childOrder + 1 }));
               treeAdapter.setMany(state, [...treeItems, { ...payload.treeItem, childOrder: payload.childOrderNew, parentId: payload.parentIdNew }]);
            } else {
               if (payload.treeItem.childOrder < payload.childOrderNew) {
                  const treeItems: TreeData[] = Object.values(state.entities)
                     .filter(item => item.childOrder > payload.treeItem.childOrder &&
                        item.childOrder <= payload.childOrderNew &&
                        item.parentId === payload.parentIdNew)
                     .map(item => ({ ...item, childOrder: item.childOrder - 1 }));
                  treeAdapter.setMany(state, [...treeItems, { ...payload.treeItem, childOrder: payload.childOrderNew }]);
               } else {
                  const treeItems: TreeData[] = Object.values(state.entities)
                     .filter(item => item.childOrder < payload.treeItem.childOrder &&
                        item.childOrder >= payload.childOrderNew &&
                        item.parentId === payload.parentIdNew)
                     .map(item => ({ ...item, childOrder: item.childOrder + 1 }));
                  treeAdapter.setMany(state, [...treeItems, { ...payload.treeItem, childOrder: payload.childOrderNew }]);
               }
            }
         },
         updateTreeItemsLocally: (state: StateArgument, action) => {
            treeAdapter.setMany(state, action);
         },
         showEditModal: (state: StateArgument, { payload }) => {
            state.showEditModal = true;
            state.currentTreeItemData = payload;
         },
         showDeleteModal: (state: StateArgument, { payload }) => {
            state.showDeleteModal = true;
            state.currentTreeItemData = payload;
         },
         setCurrentTreeItemName: (state: StateArgument, { payload }) => {
            if (state.currentTreeItemData === null) {
               state.currentTreeItemData = emptyEntity; // TODO: make a prototype?
            }
            state.currentTreeItemData.name = payload;
         },
         hideEditModal: (state: StateArgument) => {
            state.showEditModal = false;
         },
         hideDeleteModal: (state: StateArgument) => {
            state.showDeleteModal = false;
         },
      },
      extraReducers: (builder) => {
         builder
            .addCase(fetchTreeItems.fulfilled, (state: any, action) => {
               treeAdapter.setAll(state, action);
               state.loadingStatus = 'idle';
               state.error = null;
            })
            .addCase(createTreeItem.fulfilled, (state: StateArgument, action) => {
               treeAdapter.addOne(state, action);
               state.loadingStatus = 'idle';
               state.error = null;
            })
            .addCase(updateTreeItem.fulfilled, (state: StateArgument, action) => {
               treeAdapter.setOne(state, action);
               state.loadingStatus = 'idle';
               state.error = null;
            })
            .addCase(updateTreeItems.fulfilled, (state: StateArgument, action) => {
               treeAdapter.setMany(state, action);
               state.loadingStatus = 'idle';
               state.error = null;
            })
            .addCase(deleteTreeItem.fulfilled, (state: StateArgument, action) => {
               treeAdapter.removeOne(state, action);
               state.loadingStatus = 'idle';
               state.error = null;
            })
            .addMatcher(isPendingAction, (state: StateArgument) => {
               state.showEditModal = false;
               state.showDeleteModal = false;
               state.currentTreeItemData = null;
               state.loadingStatus = 'loading';
            })
            .addMatcher(isRejectedAction, (state: StateArgument, action) => {
               state.loadingStatus = 'failed';
               // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
               state.error = action.error as SerializedError;
            });
      },
   };
   const treeSlice = createSlice(treeSliceData);

   return {
      treeSlice,
      fetchTreeItems,
      createTreeItem,
      updateTreeItem,
      updateTreeItems,
      deleteTreeItem,
      treeAdapter
   };
}
