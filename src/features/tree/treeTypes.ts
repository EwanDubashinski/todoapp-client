import type { SerializedError, AsyncThunk, Draft, EntityState, EntityId } from '@reduxjs/toolkit';

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export type DraftableEntityState<T, Id extends EntityId> =
   | EntityState<T, Id>
   | Draft<EntityState<T, Id>>;

export interface TreeData {
   id: number;
   childOrder: number;
   parentId?: number | null;
   name?: string;
};

export type TreeState<T extends TreeData> = {
   loadingStatus: string,
   error: null | SerializedError,
   showEditModal: boolean,
   showDeleteModal: boolean,
   currentTreeItemData: T | null,
};