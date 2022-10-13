import React from 'react'; // we need this to make JSX compile
import { ProjectData } from './types'
import _ from 'lodash';
import classNames from 'classnames';
import { Accordion } from 'react-bootstrap';

type ProjectProps = {
    data: ProjectData,
    projects: Array<ProjectData>,
    setActiveProject: Function,
    acitiveProject: number | null,
};

const Project = ({ data: { name, id }, projects, setActiveProject, acitiveProject }: ProjectProps) => {
    const children = projects
        .filter(prj => prj.parent === id)
        .map(prj => (
            <Project
                key={_.uniqueId()}
                data={prj}
                projects={projects}
                acitiveProject={acitiveProject}
                setActiveProject={setActiveProject}
            />
        ));
    const className = classNames({active: id === acitiveProject});
    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        setActiveProject(id);
    };
    return (<>
        <Accordion.Item eventKey={id.toString()}>
            {children.length > 0 ?
<Accordion.Header>
<a href="#" className={className} onClick={onClick}>{name}</a>
</Accordion.Header>
: <a href="#" className={className} onClick={onClick}>{name}</a>}
            {children.length > 0 &&
                (
                    <Accordion.Body>
                        <Accordion alwaysOpen flush>
                            {children}
                        </Accordion>
                    </Accordion.Body>
                )
            }

        </Accordion.Item>
    </>);
};

export default Project;
