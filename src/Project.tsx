import React, { useState } from 'react'; // we need this to make JSX compile
import { ProjectData } from './types'
import _ from 'lodash';
import classNames from 'classnames';
import { Button, Col, Collapse, Nav, Row } from 'react-bootstrap';
import { AppDispatch, RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { showDeleteModal, showProjectModal, projectsSelectors, updateProjectsLocally, updateProjects } from './features/projects/projectsSlice';
import updatePojectPosition from './features/projects/projectsProcessing';

type ProjectProps = {
    data: ProjectData,
    // projects: Array<ProjectData>,
    setActiveProject: (active: ProjectData) => void,
    acitiveProject: ProjectData | null,
};

const Project = ({ data, setActiveProject, acitiveProject }: ProjectProps) => {
    const [collapsed, setCollapsed] = useState(data.collapsed);
    const [showControls, setShowControls] = useState(false);
    const projects = useSelector(projectsSelectors.selectAll);
    const parent: ProjectData|null = _.isNil(data.parentId) ? null : useSelector((state: RootState) => projectsSelectors.selectById(state, data.parentId!));
    // const selectById = (projectId: number) => useSelector((state: RootState) => projectsSelectors.selectById(state, projectId));

    const siblingProjects = projects.filter(prj => prj.parentId === data.parentId);
    const dispatch: AppDispatch = useDispatch();
    const applyUpdate = (childOrderNew: number, parentIdNew: number | null | undefined) => {
        const updatedProjects = updatePojectPosition(projects, data, childOrderNew, parentIdNew);

        dispatch(updateProjectsLocally(updatedProjects));
        dispatch(updateProjects(updatedProjects));
    };
    // TODO: For avoid calculations each time we can store necessary metadata in db
    const onUpClick = async () => {
        const projectsAbove: ProjectData[] = siblingProjects
                .filter(prj => prj.childOrder < data.childOrder)
                .sort((a, b) => b.childOrder - a.childOrder);
        if (projectsAbove.length > 0) {
            applyUpdate(projectsAbove[0].childOrder, data.parentId);
        }
    };
    const onDownClick = async () => {
        const projectsBelow: ProjectData[] = siblingProjects
            .filter(prj => prj.childOrder > data.childOrder)
            .sort((a, b) => a.childOrder - b.childOrder);

        if (projectsBelow.length > 0) {
            applyUpdate(projectsBelow[0].childOrder, data.parentId);
        }
    };
    const onLeftClick = async () => {
        if (_.isNil(parent)) return;

        const projectsBelowParent: ProjectData[] = projects
            .filter(prj => prj.parentId == parent.parentId && prj.childOrder > parent.childOrder)
            .sort((a, b) => a.childOrder - b.childOrder);

        const childOrderNew = projectsBelowParent.length === 0 ? parent.childOrder + 1 : projectsBelowParent[0].childOrder;

        applyUpdate(childOrderNew, parent.parentId);
    };
    const onRightClick = async () => {
        const projectsAbove: ProjectData[] = siblingProjects
            .filter(prj => prj.childOrder < data.childOrder)
            .sort((a, b) => b.childOrder - a.childOrder);
        if (projectsAbove.length > 0) {
            const projectAbove = projectsAbove[0];
            const projectAboveChildren = projects
                    .filter(prj => prj.parentId === projectAbove.id)
                    .sort((a, b) => b.childOrder - a.childOrder);
            const childOrderNew = projectAboveChildren.length === 0 ? 0 : projectAboveChildren[0].childOrder + 1;

            applyUpdate(childOrderNew, projectAbove.id);
        }
    };
    const children = projects
        .filter(prj => prj.parentId === data.id)
        .sort((a, b) => (a.childOrder ?? 0) - (b.childOrder ?? 0))
        .map(prj => (
            <Project
                key={_.uniqueId()}
                data={prj}
                acitiveProject={acitiveProject}
                setActiveProject={setActiveProject}
            />
        ));
    const collapse = () => {
        const newCollapsedState = collapsed == 1 ? 0 : 1
        setCollapsed(newCollapsedState);
        // updateProject({ ...data, collapsed: newCollapsedState }, ServerAction.SET_COLLAPSED);
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
        <Nav.Link className={className} active={active} onClick={onClick}>
            {String(data.childOrder).padStart(2, "0")} | {data.name}
        </Nav.Link>
        {showControls && (
            <Col sm="6">
                <Button variant="outline-primary" onClick={onUpClick} size="sm">&#11014;</Button>
                <Button variant="outline-primary" onClick={onDownClick} size="sm">&#11015;</Button>
                <Button variant="outline-primary" onClick={onLeftClick} size="sm">&#9664;</Button>
                <Button variant="outline-primary" onClick={onRightClick} size="sm">&#9654;</Button>
                {/* <Button variant="outline-primary" onClick={() => editProject(data)} size="sm">&#9998;</Button> */}
                <Button variant="outline-primary" onClick={() => dispatch(showProjectModal(data))} size="sm">&#9998;</Button>
                {/* <Button variant="outline-primary" onClick={() => deleteProject(data)} size="sm">&#128465;</Button> */}
                <Button variant="outline-primary" onClick={() => dispatch(showDeleteModal(data))} size="sm">&#128465;</Button>
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
