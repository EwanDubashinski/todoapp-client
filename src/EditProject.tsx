import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ProjectData } from './types';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
type EditProjectProps = {
    show: boolean,
    handleClose: (newData?: ProjectData) => void,
    data: ProjectData | null,
};

const EditProject = ({ show, handleClose, data }: EditProjectProps) => {
    if (!data) data = {};
    const prjName = data?.name;
    const [name, setName] = useState<string>();
    useEffect(() => { setName(prjName) }, [prjName]);
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
                            value={name}
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
                <Button variant="primary" onClick={() => {
                    if (_.isEmpty(name)) return;
                    handleClose({...data, name});
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}
export default EditProject;
