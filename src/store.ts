import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './features/projects/projectsSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;