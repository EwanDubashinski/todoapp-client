import React, { ChangeEventHandler, useState, useEffect, useContext } from 'react'; // we need this to make JSX compile
import { TaskData } from './types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import classNames from 'classnames';
import axios from 'axios';
import FormMode from './FormMode';
import ServerAction from './ServerAction';
import Modal from 'react-bootstrap/Modal';

type FormState = {
    formMode: FormMode,
    activeId: number,
}
type TaskProps = {
    data: TaskData,
    acitiveProject: number | null,
    tasks: Array<TaskData>,
    updateTask: Function,
    formState: FormState,
    setFormState: Function,
    refreshTasks: Function
};

const Task = ({ data, tasks, acitiveProject, updateTask, formState, setFormState, refreshTasks }: TaskProps) => {
// const Task = ({ data: { content, id, dateCompleted }, tasks, acitiveProject, upd }: TaskProps) => {
    let { content, id, dateCompleted } = data;

    const showInput = formState.activeId === id && formState.formMode !== FormMode.READ;

    const [showControls, setShowControls] = useState(false);
    const [text, setText] = useState(content);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const isDone = !_.isUndefined(dateCompleted); // TODO: maybe change

    const className = classNames("col-6", {'task-done': isDone});

    const onCheck: ChangeEventHandler = () => {
        const action: ServerAction = isDone ? ServerAction.UNDONE : ServerAction.DONE;
        updateTask(data, action);
    };

    const onDeleteClick = () => {
        setShowDeleteDialog(true);
    };
    const deleteTask = async () => {
        const action = ServerAction.DELETE;
        await updateTask(data, action);
        setFormState({formMode: FormMode.READ, activeId: -1});
    };
    const onEditClick = () => {
        setFormState({formMode: FormMode.EDIT, activeId: id});
    };
    const onCancelClick = () => {
        setFormState({formMode: FormMode.READ, activeId: -1});
        refreshTasks();
    };
    const onSaveClick = async () => {
        const action = id === 0 ? ServerAction.CREATE : ServerAction.UPDATE;
        await updateTask({...data, content: text}, action);
        setFormState({formMode: FormMode.READ, activeId: -1});
    };
    const onDialogClose = () => setShowDeleteDialog(false);
    const onUpClick = async () => {
        await updateTask(data, ServerAction.UP);
        // refreshTasks();
    };
    const onDownClick = async () => {
        await updateTask(data, ServerAction.DOWN);
        // refreshTasks();
    };
    const onLeftClick = async () => {
        await updateTask(data, ServerAction.LEFT);
        // refreshTasks();
    };
    const onRightClick = async () => {
        await updateTask(data, ServerAction.RIGHT);
        // refreshTasks();
    };
    const children = tasks
        .filter(task => task.parentId === id)
        .sort((a, b) => (a.childOrder ?? 0) - (b.childOrder ?? 0))
        .map(task => (
            <Task
                key={_.uniqueId()}
                data={task}
                tasks={tasks}
                acitiveProject={acitiveProject}
                updateTask={updateTask}
                formState={formState}
                setFormState={setFormState}
                refreshTasks={refreshTasks}
            />
        ));
    const taskClass = classNames("row", {"highlight": showControls});
    let element;
    if (showInput) {
        element =
            <li className='row highlight'>
                <Form.Group className="col-10">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="text" value={text} placeholder="What do you want to do?" onChange={(e) => setText(e.target.value)} />
                </Form.Group>
                <div className='col-2'>
                    <Button variant="outline-primary" onClick={onCancelClick} size="sm">&#128473;</Button>
                    <Button variant="outline-primary" onClick={onSaveClick} size="sm">&#128190;</Button>
                </div>
            </li>
    } else {
        element = <li onMouseEnter={() => setShowControls(!isDone)} onMouseLeave={() => setShowControls(false)} className={taskClass}>
            <Form.Check className={className} defaultChecked={isDone} type="checkbox" label={text} onChange={onCheck} />
            {showControls && formState.formMode === FormMode.READ && (
                <div className='col-6'>
                    <Button variant="outline-primary" onClick={onUpClick} size="sm">&#11014;</Button>
                    <Button variant="outline-primary" onClick={onDownClick} size="sm">&#11015;</Button>
                    <Button variant="outline-primary" onClick={onLeftClick} size="sm">&#9664;</Button>
                    <Button variant="outline-primary" onClick={onRightClick} size="sm">&#9654;</Button>
                    <Button variant="outline-primary" onClick={onDeleteClick} size="sm">&#128465;</Button>
                    <Button variant="outline-primary" onClick={onEditClick} size="sm">&#9998;</Button>
                </div>
            )}
        </li>
    }
    return (<>
        {element}
        {children.length > 0 &&
            (<ul>
                {children}
            </ul>)
        }
        <Modal show={showDeleteDialog} onHide={onDialogClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete task "{text}"?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDialogClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={deleteTask}>
                    Yes, delete it
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
};

export default Task;
