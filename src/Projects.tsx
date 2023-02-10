import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import Project from './Project';
import { ProjectData } from './types'
import _ from 'lodash';
import axios from 'axios';
import { Accordion, Button } from 'react-bootstrap';
import ServerAction from './ServerAction';
import EditProject from './EditProject';

type ProjectsProps = {
    projects: Array<ProjectData>,
    refreshProjects: Function,
    setActiveProject: Function,
    acitiveProject: ProjectData | null,
};

const Projects = ({ projects, refreshProjects, setActiveProject, acitiveProject }: ProjectsProps) => {
    const [show, setShow] = useState(false);

    const handleClose = (newData: ProjectData) => {
        setShow(false);
        updateProject(newData, ServerAction.CREATE);
    };
    const handleShow = () => setShow(true);

    const updateProject = async (project: ProjectData, action: ServerAction) => {
        let URI: string;
        switch (action) {
            case ServerAction.SET_COLLAPSED:
                URI = `http://localhost:8081/api/project/collapsed`;
                break;
            case ServerAction.UPDATE:
                URI = `http://localhost:8081/api/project/update`;
                break;
            case ServerAction.CREATE:
                URI = `http://localhost:8081/api/project/create`;
                break;
            case ServerAction.DELETE:
                URI = `http://localhost:8081/api/project/delete`;
                break;
            case ServerAction.UP:
                URI = `http://localhost:8081/api/project/up`;
                break;
            case ServerAction.DOWN:
                URI = `http://localhost:8081/api/project/down`;
                break;
            case ServerAction.RIGHT:
                URI = `http://localhost:8081/api/project/right`;
                break;
            case ServerAction.LEFT:
                URI = `http://localhost:8081/api/project/left`;
                break;
            default:
                return;
        }

        await axios.post(URI, project);
        refreshProjects();
    }

    return (<aside className='projects'>
                <h2>Projects</h2>
                <Button variant="primary" onClick={() => setShow(true)}>Primary</Button>
                {/* <Accordion alwaysOpen flush> */}
                    {projects
                        .filter(prj => _.isUndefined(prj.parentId))
                        .map(prj => (
                            <Project
                                key={_.uniqueId()}
                                data={prj}
                                projects={projects}
                                acitiveProject={acitiveProject}
                                setActiveProject={setActiveProject}
                                updateProject={updateProject}
                            />
                    ))}
                {/* </Accordion> */}
                <EditProject show={show} handleClose={handleClose} data={null}/>
            </aside>)
    };

// const el = <Card title="Welcome!" paragraph="To this example" />

export default Projects;
