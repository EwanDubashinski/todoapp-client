import { useState } from 'react';
import Project from './Project';
import { ProjectData } from './types'
import _ from 'lodash';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import ServerAction from './ServerAction';
import EditProject from './EditProject';
import { useDispatch, useSelector } from 'react-redux';
import { showProjectModal, projectsSelectors } from './features/projects/projectsSlice';
import { RootState } from './store';

type ProjectsProps = {
    // projects: Array<ProjectData>,
    // refreshProjects: () => void,
    setActiveProject: (active: ProjectData) => void,
    acitiveProject: ProjectData | null,
};

const Projects = ({ /* projects, refreshProjects,*/ setActiveProject, acitiveProject }: ProjectsProps) => {
    // const [show, setShow] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editData, setEditData] = useState<ProjectData | null>(null)

    // const handleClose = (newData?: ProjectData) => {
    //     // setShow(false);
    //     if (newData) {
    //         const action = newData.id ? ServerAction.UPDATE : ServerAction.CREATE;
    //         updateProject(newData, action);
    //     }
    // };
    // const handleShow = () => {
    //     setEditData(null);
    //     // setShow(true);
    // };
    const dispatch = useDispatch();
    const editProject = (prjData: ProjectData) => {
        setEditData(prjData);
        // setShow(true);
    };
    const onDelClose = () => setShowDeleteDialog(false);
    const showDeleteProject = (prjData: ProjectData) => {
        if (!prjData) return;
        setEditData(prjData);
        setShowDeleteDialog(true);
    };
    const deleteProject = async (data: ProjectData) => {
        setShowDeleteDialog(false);
        const action = ServerAction.DELETE;
        await updateProject(data, action);
    };
    const updateProject = async (project: ProjectData, action: ServerAction) => {
        let URI: string;
        switch (action) {
            case ServerAction.SET_COLLAPSED:
                URI = `/api/project/collapsed`;
                break;
            case ServerAction.UPDATE:
                URI = `/api/project/update`;
                break;
            case ServerAction.CREATE:
                URI = `/api/project/create`;
                break;
            case ServerAction.DELETE:
                URI = `/api/project/delete`;
                break;
            case ServerAction.UP:
                URI = `/api/project/up`;
                break;
            case ServerAction.DOWN:
                URI = `/api/project/down`;
                break;
            case ServerAction.RIGHT:
                URI = `/api/project/right`;
                break;
            case ServerAction.LEFT:
                URI = `/api/project/left`;
                break;
            default:
                return;
        }
        await axios.post(URI, project);

        if (action !== ServerAction.SET_COLLAPSED) {
            // refreshProjects();
        }
    }


    // const projects = useSelector((state: RootState) => state.projects.entities);
    const projects = useSelector(projectsSelectors.selectAll);

    return (<aside className='projects'>
                <h2>Projects</h2>
                <Button variant="primary" onClick={() => dispatch(showProjectModal(null))}>+</Button>
                {/* <Accordion alwaysOpen flush> */}
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
                                updateProject={updateProject}
                                editProject={editProject}
                                deleteProject={showDeleteProject}
                            />
                    ))}
                {/* </Accordion> */}
                <EditProject/>
                <Modal show={showDeleteDialog} onHide={onDelClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to delete project "{editData?.name}"?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onDelClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => editData && deleteProject(editData)}>
                            Yes, delete it
                        </Button>
                    </Modal.Footer>
                </Modal>
            </aside>)
    };

export default Projects;
