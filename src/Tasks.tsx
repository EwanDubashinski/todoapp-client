import React, { useContext, useEffect, useState } from 'react'; // we need this to make JSX compile
import _ from 'lodash';
import { TaskData } from './types'
import FormMode  from './FormMode'
import ServerAction  from './ServerAction'
import Task from './Task';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

type TasksProps = {
    acitiveProject: number,
    // tasks: Array<TaskData>,
};

const Tasks = ({ acitiveProject }: TasksProps) => {
    // const projectTasks = tasks
    //     .filter(task => task.project_id === acitiveProject);
    const [tasks, setTasks] = useState(new Array<TaskData>);
    const [formState, setFormState] = useState({formMode: FormMode.READ, activeId: -1});
    const refreshTasks = () => {
        axios
            .get('http://localhost:8081/api/items/' + acitiveProject)
            .then(res => setTasks(res.data));
    };

    const updateTask = async (task: TaskData, action: ServerAction) => {
        let URI: string;
        switch (action) {
            case ServerAction.DONE:
                URI = `http://localhost:8081/api/item/done`;
                break;
            case ServerAction.UNDONE:
                URI = `http://localhost:8081/api/item/undone`;
                break;
            case ServerAction.UPDATE:
                URI = `http://localhost:8081/api/item/update`;
                break;
            case ServerAction.CREATE:
                URI = `http://localhost:8081/api/item/create`;
                break;
            default:
                return;
        }

        await axios.post(URI, task);
        refreshTasks();
    }
    const onNewClick = () => {
        const newTask: TaskData = {
            content: "",
            projectId: acitiveProject,
            checked: 0,
            date_added: new Date().toISOString(),
            id: 0,
        };
        setFormState({formMode: FormMode.CREATE, activeId: newTask.id});
        setTasks([...tasks, newTask]);
    };
    useEffect(() => {
        if (acitiveProject !== null) refreshTasks();
    }, [acitiveProject]);
    // console.log("render!")
    return (
    <div className='tasks col'>
        <h2>Tasks</h2>
        <ul>
            {tasks
                .filter(task => _.isUndefined(task.parentId) &&
                                _.isUndefined(task.dateCompleted))
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
                ))}
            {formState.formMode === FormMode.READ && (
                <li>
                    <Button variant="outline-primary" onClick={onNewClick} size="sm">&#43;</Button>
                </li>
            )}

        </ul>
        <h2>Completed tasks</h2>
        <ul>
        {tasks
                .filter(task => !_.isUndefined(task.dateCompleted) &&
                _.isUndefined(task.parentId))
                .map(task => (
                    // task.content
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
                ))}
        </ul>
    </div>)
};

// const el = <Card title="Welcome!" paragraph="To this example" />

export default Tasks;
