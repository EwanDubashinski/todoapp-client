var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react'; // we need this to make JSX compile
import _ from 'lodash';
import classNames from 'classnames';
import { Button, Collapse, Nav, Row } from 'react-bootstrap';
var Project = function (_a) {
    var _b = _a.data, name = _b.name, id = _b.id, projects = _a.projects, setActiveProject = _a.setActiveProject, acitiveProject = _a.acitiveProject;
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var children = projects
        .filter(function (prj) { return prj.parent === id; })
        .map(function (prj) { return (_jsx(Project, { data: prj, projects: projects, acitiveProject: acitiveProject, setActiveProject: setActiveProject }, _.uniqueId())); });
    var hasChildren = children.length > 0;
    var className = classNames({ active: id === acitiveProject });
    var onClick = function (e) {
        e.stopPropagation();
        setActiveProject(id);
    };
    var arrowRight = "\u2B9E";
    var arrowDown = "\u2B9F";
    var active = id === acitiveProject;
    var projectItem = _jsx(Nav.Link, __assign({ className: 'col', active: active, onClick: onClick }, { children: name }));
    var padding = { paddingLeft: "20px" };
    return (_jsx(_Fragment, { children: hasChildren ?
            _jsxs(_Fragment, { children: [_jsxs(Row, { children: [_jsx(Button, __assign({ variant: "link", size: "sm", onClick: function () { return setOpen(!open); }, className: 'col-1' }, { children: open ? arrowDown : arrowRight })), projectItem] }), _jsx(Collapse, __assign({ in: open }, { children: _jsx("div", __assign({ style: padding }, { children: children })) }))] })
            :
                _jsxs(Row, { children: [_jsx("div", { className: 'col-1' }), projectItem] }) }));
};
export default Project;
//# sourceMappingURL=Project.js.map