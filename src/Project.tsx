import React, { useState } from 'react'; // we need this to make JSX compile
import { ProjectData } from './types'
import _ from 'lodash';
import classNames from 'classnames';
import { Button, Collapse, Nav, Row } from 'react-bootstrap';
import ServerAction from './ServerAction';

type ProjectProps = {
    data: ProjectData,
    projects: Array<ProjectData>,
    setActiveProject: Function,
    acitiveProject: ProjectData | null,
    updateProject: Function,
};

const Project = ({ data, projects, setActiveProject, acitiveProject, updateProject }: ProjectProps) => {
    const [collapsed, setCollapsed] = useState(data.collapsed);
    const children = projects
        .filter(prj => prj.parentId === data.id)
        .map(prj => (
            <Project
                key={_.uniqueId()}
                data={prj}
                projects={projects}
                acitiveProject={acitiveProject}
                setActiveProject={setActiveProject}
                updateProject={updateProject}
            />
        ));
    const collapse = () => {
        const newCollapsedState = collapsed == 1 ? 0 : 1
        setCollapsed(newCollapsedState);
        updateProject({ ...data, collapsed: newCollapsedState }, ServerAction.SET_COLLAPSED);
    };
    const hasChildren = children.length > 0;
    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        setActiveProject(data);
    };
    const arrowRight = "\u2B9E";
    const arrowDown = "\u2B9F";
    const active = data.id === acitiveProject?.id;
    const className = classNames("col", { active: active });
    const projectItem = <Nav.Link className={className} active={active} onClick={onClick}>{data.name}</Nav.Link>;
    const padding = {paddingLeft: "20px"};
    return (<>
        {hasChildren ?
            <>
                <Row>
                    <Button variant="link" size="sm" onClick={collapse} className='col-1'>
                        {collapsed == 0 ? arrowDown : arrowRight}
                    </Button>
                    {projectItem}
                </Row>
                <Collapse in={collapsed == 0}>
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
