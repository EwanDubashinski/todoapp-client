import { ProjectData } from '../../types';

export default function (allProjects: ProjectData[], project: ProjectData, childOrderNew: number, parentIdNew: number | null | undefined ): ProjectData[] {
   let changedProjects: ProjectData[];

   if (project.parentId !== parentIdNew) {
      changedProjects = allProjects
         .filter(prj => prj.childOrder >= childOrderNew &&
            prj.parentId === parentIdNew)
         .map(prj => ({ ...prj, childOrder: prj.childOrder + 1 }));
      // projectsAdapter.setMany(state, [...projects, { ...project, childOrder: childOrderNew, parentId: parentIdNew }]);
   } else {
      if (project.childOrder < childOrderNew) {
         changedProjects = allProjects
            .filter(prj => prj.childOrder > project.childOrder &&
               prj.childOrder <= childOrderNew &&
               prj.parentId === parentIdNew)
            .map(prj => ({ ...prj, childOrder: prj.childOrder - 1 }));
      } else {
         changedProjects = allProjects
            .filter(prj => prj.childOrder < project.childOrder &&
               prj.childOrder >= childOrderNew &&
               prj.parentId === parentIdNew)
            .map(prj => ({ ...prj, childOrder: prj.childOrder + 1 }));
      }
   }
   const changedProject: ProjectData = { ...project, childOrder: childOrderNew, parentId: parentIdNew };
   changedProjects.push(changedProject);
   return changedProjects;
}