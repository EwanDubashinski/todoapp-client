import React, { useState } from 'react'; // we need this to make JSX compile
import { ProjectData } from './types'
import _ from 'lodash';
import classNames from 'classnames';
import { Button, Col, Collapse, Modal, Nav, Row } from 'react-bootstrap';
import ServerAction from './ServerAction';

type ProjectProps = {
    data: ProjectData,
    projects: Array<ProjectData>,
    setActiveProject: Function,
    acitiveProject: ProjectData | null,
    updateProject: Function,
    editProject: Function,
    deleteProject: Function,
};

const Project = ({ data, projects, setActiveProject, acitiveProject, updateProject, editProject, deleteProject }: ProjectProps) => {
    const [collapsed, setCollapsed] = useState(data.collapsed);
    const [showControls, setShowControls] = useState(false);
    const onUpClick = async () => {
        await updateProject(data, ServerAction.UP);
    };
    const onDownClick = async () => {
        await updateProject(data, ServerAction.DOWN);
    };
    const onLeftClick = async () => {
        await updateProject(data, ServerAction.LEFT);
        // refreshTasks();
    };
    const onRightClick = async () => {
        await updateProject(data, ServerAction.RIGHT);
        // refreshTasks();
    };
    const children = projects
        .filter(prj => prj.parentId === data.id)
        .sort((a, b) => (a.childOrder ?? 0) - (b.childOrder ?? 0))
        .map(prj => (
            <Project
                key={_.uniqueId()}
                data={prj}
                projects={projects}
                acitiveProject={acitiveProject}
                setActiveProject={setActiveProject}
                updateProject={updateProject}
                editProject={editProject}
                deleteProject={deleteProject}
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
    const projectItem =
    <>
        <Nav.Link className={className} active={active} onClick={onClick}>{data.name}</Nav.Link>
        {showControls && (
            <Col sm="6">
                <Button variant="outline-primary" onClick={onUpClick} size="sm">&#11014;</Button>
                <Button variant="outline-primary" onClick={onDownClick} size="sm">&#11015;</Button>
                <Button variant="outline-primary" onClick={onLeftClick} size="sm">&#9664;</Button>
                <Button variant="outline-primary" onClick={onRightClick} size="sm">&#9654;</Button>
                <Button variant="outline-primary" onClick={() => editProject(data)} size="sm">&#9998;</Button>
                <Button variant="outline-primary" onClick={() => deleteProject(data)} size="sm">&#128465;</Button>
            </Col>
        )}
    </>
    const padding = {paddingLeft: "20px"};
    const taskClass = classNames("row", { "highlight": showControls });

    return (
    <>
        <>
            <Row className={taskClass} onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
                {hasChildren ?
                <Button variant="link" size="sm" onClick={collapse} className='col-1'>
                    {collapsed == 0 ? arrowDown : arrowRight}
                </Button>
                :
                <Col sm="1" />}
                {projectItem}
            </Row>
            {hasChildren &&
            <Collapse in={collapsed == 0}>
                <div style={padding}>
                    {children}
                </div>
            </Collapse>}
        </>



    </>);
};

export default Project;
