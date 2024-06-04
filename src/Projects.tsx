import Project from './Project';
import { ProjectData } from './types'
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import EditProject from './EditProject';
import { useDispatch, useSelector } from 'react-redux';
import { showEditModal, projectsSelectors } from './features/projects/projectsSlice';
import DeleteProject from './DeleteProject';
import { AppDispatch } from './store';


type ProjectsProps = {
    setActiveProject: (active: ProjectData) => void,
    acitiveProject: ProjectData | null,
};

const Projects = ({ setActiveProject, acitiveProject }: ProjectsProps) => {
    const dispatch: AppDispatch = useDispatch();
    const projects = useSelector(projectsSelectors.selectAll);

    return (<aside className='projects'>
                <h2>Projects</h2>
                <Button variant="primary" onClick={() => dispatch(showEditModal(null))}>+</Button>
                    {projects
                        .filter(prj => _.isUndefined(prj.parentId))
                        .sort((a, b) => (a.childOrder ?? 0) - (b.childOrder ?? 0))
                        .map(prj => (
                            <Project
                                key={_.uniqueId()}
                                data={prj}
                                acitiveProject={acitiveProject}
                                setActiveProject={setActiveProject}
                            />
                    ))}
                <EditProject/>
                <DeleteProject/>
            </aside>)
    };

export default Projects;
