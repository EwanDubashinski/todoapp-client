import { createSlice, createEntityAdapter, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError, UnknownAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios';
import ProjectsServerActions from './ProjectsServerActions';
import { ProjectData } from '../../types';
import { RootState } from '../../store';

const projectsAdapter = createEntityAdapter<ProjectData>();
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

type ProjectsState = {
   loadingStatus: string,
   error: null | SerializedError,
   showProjectModal: boolean,
   currentProjectData: ProjectData | null,
};
const projectsState: ProjectsState = {
   loadingStatus: 'idle',
   error: null,
   showProjectModal: false,
   currentProjectData: null,
};

// { ids: [], entities: {} }
const initialState = projectsAdapter.getInitialState(projectsState);

export const fetchProjects = createAsyncThunk(
   'projects/fetchProjects',
   async () => {
      const response = await axios.get(ProjectsServerActions.FETCH);
      return response.data;
   }
);

export const createProject = createAsyncThunk(
   'projects/create',
   async (project: ProjectData) => {
      const response = await axios.post(ProjectsServerActions.CREATE, project);
      return response.data;
   }
);
export const updateProject = createAsyncThunk(
   'projects/update',
   async (project: ProjectData) => {
      const response = await axios.put(ProjectsServerActions.UPDATE, project);
      return response.data;
   }
);

const isPendingAction = (action: UnknownAction): action is PendingAction => {
   return typeof action.type === 'string' && action.type.endsWith('/pending')
}
const isRejectedAction = (action: UnknownAction): action is RejectedAction => {
   return typeof action.type === 'string' && action.type.endsWith('/rejected')
}

export const projectsSlice = createSlice({
   name: 'projects',
   initialState,
   reducers: {
      showProjectModal: (state, { payload }) => {
         state.showProjectModal = true;
         state.currentProjectData = payload;
      },
      // addProject: (state, { payload }) => {
      //    // projectsAdapter.addOne(state, {...payload, id: -1}); I'll make it later
      //    createProject(payload);
      //    state.showProjectModal = false;
      // },
      setCurrentProjectName: (state, {payload}) => {
         if (state.currentProjectData === null) {
            state.currentProjectData = {id: -1};
         }
         state.currentProjectData.name = payload;
      },
      hideProjectModal: (state) => {
         state.showProjectModal = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProjects.fulfilled, (state, action) => {
            projectsAdapter.setAll(state, action);
            state.loadingStatus = 'idle';
            state.error = null;
         })
         .addCase(createProject.fulfilled, (state, action) => {
            projectsAdapter.addOne(state, action);
            state.loadingStatus = 'idle';
            state.error = null;
         })
         .addCase(updateProject.fulfilled, (state, action) => {
            projectsAdapter.setOne(state, action);
            state.loadingStatus = 'idle';
            state.error = null;
         })
         .addMatcher(isPendingAction, (state, action) => {
            state.showProjectModal = false;
            state.currentProjectData = null;
            state.loadingStatus = 'loading'
         })
         .addMatcher(isRejectedAction, (state, action) => {
            state.loadingStatus = 'failed';
            // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
            state.error = action.error as SerializedError;
         });
   },
});

// Action creators are generated for each case reducer function
export const { showProjectModal, hideProjectModal, setCurrentProjectName } = projectsSlice.actions;
export const projectsSelectors = projectsAdapter.getSelectors((state: RootState) => state.projects);
export default projectsSlice.reducer;