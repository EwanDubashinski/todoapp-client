import { ProjectData } from '../../types';
import { projectsSelectors, updateProjects, updateProjectsLocally } from '../../features/projects/projectsSlice';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';


export default function (project: ProjectData, childOrderNew: number, parentIdNew: number ) {
   const dispatch: AppDispatch = useDispatch();
   let projects: ProjectData[];
   const allProjects: ProjectData[] = useSelector(projectsSelectors.selectAll);

   if (project.parentId !== parentIdNew) {
      projects = allProjects
         .filter(prj => prj.childOrder >= childOrderNew &&
            prj.parentId === parentIdNew)
         .map(prj => ({ ...prj, childOrder: prj.childOrder + 1 }));
      // projectsAdapter.setMany(state, [...projects, { ...project, childOrder: childOrderNew, parentId: parentIdNew }]);
   } else {
      if (project.childOrder < childOrderNew) {
         projects = allProjects
            .filter(prj => prj.childOrder > project.childOrder &&
               prj.childOrder <= childOrderNew &&
               prj.parentId === parentIdNew)
            .map(prj => ({ ...prj, childOrder: prj.childOrder - 1 }));
      } else {
         projects = allProjects
            .filter(prj => prj.childOrder < project.childOrder &&
               prj.childOrder >= childOrderNew &&
               prj.parentId === parentIdNew)
            .map(prj => ({ ...prj, childOrder: prj.childOrder + 1 }));
      }
   }
   const changedProject: ProjectData = { ...project, childOrder: childOrderNew, parentId: parentIdNew };
   projects.push(changedProject);
   dispatch(updateProjectsLocally(projects));
   dispatch(updateProjects(projects));
}