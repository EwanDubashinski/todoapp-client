import Project from './Project';
import { ProjectData } from './types'
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import EditProject from './EditProject';
import { useDispatch, useSelector } from 'react-redux';
import { showProjectModal, projectsSelectors } from './features/projects/projectsSlice';
import DeleteProject from './DeleteProject';

type ProjectsProps = {
    setActiveProject: (active: ProjectData) => void,
    acitiveProject: ProjectData | null,
};

const Projects = ({ /* projects, refreshProjects,*/ setActiveProject, acitiveProject }: ProjectsProps) => {
    const dispatch = useDispatch();
    const projects = useSelector(projectsSelectors.selectAll);

    return (<aside className='projects'>
                <h2>Projects</h2>
                <Button variant="primary" onClick={() => dispatch(showProjectModal(null))}>+</Button>
                    {projects
                        .filter(prj => _.isUndefined(prj.parentId))
                        .sort((a, b) => (a.childOrder ?? 0) - (b.childOrder ?? 0))
                        .map(prj => (
                            <Project
                                key={_.uniqueId()}
                                data={prj}
                                projects={projects}
                                acitiveProject={acitiveProject}
                                setActiveProject={setActiveProject}
                            />
                    ))}
                <EditProject/>
                <DeleteProject/>
            </aside>)
    };

export default Projects;
