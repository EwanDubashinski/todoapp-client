import { useEffect, useState } from 'react';
import _ from 'lodash';
import { ProjectData, TaskData } from './types'
import FormMode  from './FormMode'
import ServerAction  from './ServerAction'
import Task from './Task';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

type TasksProps = {
    acitiveProject: ProjectData | null,
    // tasks: Array<TaskData>,
};

const Tasks = ({ acitiveProject }: TasksProps) => {
    // const projectTasks = tasks
    //     .filter(task => task.project_id === acitiveProject);
    const [tasks, setTasks] = useState(new Array<TaskData>);
    const [formState, setFormState] = useState({formMode: FormMode.READ, activeId: -1});
    const refreshTasks = () => {
        if (!acitiveProject) return;
        axios
            .get('/api/items/' + acitiveProject.id)
            .then(res => setTasks(res.data));
    };

    const updateTask = async (task: TaskData, action: ServerAction) => {
        let URI: string;
        switch (action) {
            case ServerAction.DONE:
                URI = `/api/item/done`;
                break;
            case ServerAction.UNDONE:
                URI = `/api/item/undone`;
                break;
            case ServerAction.UPDATE:
                URI = `/api/item/update`;
                break;
            case ServerAction.CREATE:
                URI = `/api/item/create`;
                break;
            case ServerAction.DELETE:
                URI = `/api/item/delete`;
                break;
            case ServerAction.UP:
                URI = `/api/item/up`;
                break;
            case ServerAction.DOWN:
                URI = `/api/item/down`;
                break;
            case ServerAction.RIGHT:
                URI = `/api/item/right`;
                break;
            case ServerAction.LEFT:
                URI = `/api/item/left`;
                break;
            default:
                return;
        }

        await axios.post(URI, task);
        refreshTasks();
    }
    const onNewClick = () => {
        if (!(acitiveProject && acitiveProject.id)) return;
        const newTask: TaskData = {
            content: "",
            projectId: acitiveProject.id,
            checked: 0,
            date_added: new Date().toISOString(),
            id: 0,
            childOrder: tasks.length
        };
        setFormState({formMode: FormMode.CREATE, activeId: newTask.id});
        setTasks([...tasks, newTask]);
    };
    useEffect(() => {
        if (acitiveProject !== null) refreshTasks();
    }, [acitiveProject]);
    // console.log("render!")
    return (acitiveProject &&
    <div className='tasks'>
        <h2>{acitiveProject?.name}</h2>
        <ul className="overflow-auto vh-100">
            {tasks
                .filter(task => _.isUndefined(task.parentId) &&
                                _.isUndefined(task.dateCompleted))
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
                ))}
            {formState.formMode === FormMode.READ && (
                <li className="row">
                    <Button className="col-1" variant="primary" onClick={onNewClick} size="sm">&#43;</Button>
                    Add task
                </li>
            )}
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

export default Tasks;
