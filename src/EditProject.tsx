import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, hideEditModal, setCurrentTreeItemName, updateProject } from './features/projects/projectsSlice';
import { AppDispatch, RootState } from './store';


const EditProject = () => {
    const show = useSelector((state: RootState) => state.projects.showProjectModal);
    const dispatch: AppDispatch = useDispatch();

    const data = useSelector((state: RootState) => state.projects.currentProjectData);
    const handleClose = () => dispatch(hideEditModal(data));
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
                            onChange={(e) => dispatch(setCurrentTreeItemName(e.target.value))}
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
