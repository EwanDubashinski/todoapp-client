import { ProjectData } from "../../types";
import getTreeSlice from "../tree/getTreeSlice";
import { RootState } from '../../store';

const {
   treeSlice,
   fetchTreeItems,
   createTreeItem,
   updateTreeItem,
   updateTreeItems,
   deleteTreeItem,
   treeAdapter
} = getTreeSlice<ProjectData>("projects");
export const fetchProjects = fetchTreeItems;
export const createProject = createTreeItem;
export const updateProject = updateTreeItem;
export const updateProjects = updateTreeItems;
export const deleteProject = deleteTreeItem;
// Action creators are generated for each case reducer function

export const { updatePosition, updateTreeItemsLocally, showEditModal, showDeleteModal, setCurrentTreeItemName, hideEditModal, hideDeleteModal } = treeSlice.actions;
// export const { showProjectModal, hideProjectModal, setCurrentProjectName, showDeleteModal, hideDeleteModal, updateProjectsLocally, updatePosition } = treeSlice.actions;
export const projectsSelectors = treeAdapter.getSelectors((state: RootState) => state.projects);
export default treeSlice.reducer;