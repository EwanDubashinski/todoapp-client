import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ProjectData } from './types';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, hideProjectModal, setCurrentProjectName, updateProject } from './features/projects/projectsSlice';
import { AppDispatch, RootState } from './store';
type EditProjectProps = {
    show: boolean,
    handleClose: (newData?: ProjectData) => void,
    data: ProjectData | null,
};

const EditProject = () => {
    // if (!data) data = {};
    const show = useSelector((state: RootState) => state.projects.showProjectModal);

    const handleClose = () => dispatch(hideProjectModal());
    // const prjName = data?.name;
    // const [name, setName] = useState<string>();
    // const [data, setData] = useState<ProjectData>();
    // useEffect(() => {
    //     const data = useSelector((state: RootState) => state.projects.currentProjectData);
    //     if (data) setData(data);
    //     else setData({id: -1});
    // }, []);
    const data = useSelector((state: RootState) => state.projects.currentProjectData);
    const dispatch: AppDispatch = useDispatch();
    return (<>
        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            type="text"
                            value={data?.name}
                            autoFocus
                            onChange={(e) => dispatch(setCurrentProjectName(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    if (data == null || _.isEmpty(data.name))
                        return;
                    if (data.id === -1)
                        dispatch(createProject(data));
                    else
                        dispatch(updateProject(data));
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}
export default EditProject;
