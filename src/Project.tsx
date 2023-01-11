import React, { useState } from 'react'; // we need this to make JSX compile
import { ProjectData } from './types'
import _ from 'lodash';
import classNames from 'classnames';
import { Button, Collapse, Nav, Row } from 'react-bootstrap';

type ProjectProps = {
    data: ProjectData,
    projects: Array<ProjectData>,
    setActiveProject: Function,
    acitiveProject: number | null,
};

const Project = ({ data: { name, id }, projects, setActiveProject, acitiveProject }: ProjectProps) => {
    const [open, setOpen] = useState(false);
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
    const hasChildren = children.length > 0;
    const className = classNames({active: id === acitiveProject});
    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        setActiveProject(id);
    };
    const arrowRight = "\u2B9E";
    const arrowDown = "\u2B9F";
    const active = id === acitiveProject;
    const projectItem = <Nav.Link className='col' active={active} onClick={onClick}>{name}</Nav.Link>;
    const padding = {paddingLeft: "20px"};
    return (<>
        {hasChildren ?
            <>
                <Row>
                    <Button variant="link" size="sm" onClick={() => setOpen(!open)} className='col-1'>
                        {open ? arrowDown : arrowRight}
                    </Button>
                    {projectItem}
                </Row>
                <Collapse in={open}>
                    <div style={padding}>
                        {children}
                    </div>
                </Collapse>
            </>
            :
            <Row>
                <div className='col-1'/>
                {projectItem}
            </Row>
        }

    </>);
};

export default Project;
