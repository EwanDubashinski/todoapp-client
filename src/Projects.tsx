import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import Project from './Project';
import { ProjectData } from './types'
import _ from 'lodash';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';

type ProjectsProps = {
    // projects: Array<ProjectData>,
    setActiveProject: Function,
    acitiveProject: number | null,
};

const Projects = ({ setActiveProject, acitiveProject }: ProjectsProps) => {
    const [projects, setProjects] = useState(new Array<ProjectData>);

    useEffect(() => {
        axios.get('http://localhost:8081/api/projects')
                .then(res => setProjects(res.data))
                .then(() => setActiveProject(localStorage.getItem("acitiveProject")));
    }, []);

    return (<div className='projects col-3'>
                <h2>Projects</h2>
                <Accordion alwaysOpen flush>
                    {projects
                        .filter(prj => _.isUndefined(prj.parent))
                        .map(prj => (
                            <Project
                                key={_.uniqueId()}
                                data={prj}
                                projects={projects}
                                acitiveProject={acitiveProject}
                                setActiveProject={setActiveProject}
                            />
                    ))}
                </Accordion>
            </div>)
    };

// const el = <Card title="Welcome!" paragraph="To this example" />

export default Projects;
