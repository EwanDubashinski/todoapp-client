import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { deleteProject, hideDeleteModal } from './features/projects/projectsSlice';

const DeleteProject = () => {
    const show = useSelector((state: RootState) => state.projects.showDeleteModal);
    const data = useSelector((state: RootState) => state.projects.currentProjectData);

    const dispatch: AppDispatch = useDispatch();
    const handleClose = () => dispatch(hideDeleteModal());

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete project "{data?.name}"?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    if (data !== null) {
                        dispatch(deleteProject(data));
                    }
                }}>
                    Yes, delete it
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default DeleteProject;
