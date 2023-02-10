import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectData } from './types';
import { Modal } from 'react-bootstrap';
type EditProjectProps = {
    show: boolean,
    handleClose: Function,
    data: ProjectData | null,
};

const EditProject = ({ show, handleClose, data }: EditProjectProps) => {
    const [name, setName] = useState(data?.name);
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
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleClose({name})}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}
export default EditProject;
