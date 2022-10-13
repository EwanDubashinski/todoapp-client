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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import _ from 'lodash';
import classNames from 'classnames';
var Project = function (_a) {
    var _b = _a.data, name = _b.name, id = _b.id, projects = _a.projects, setActiveProject = _a.setActiveProject, acitiveProject = _a.acitiveProject;
    var children = projects
        .filter(function (prj) { return prj.parent === id; })
        .map(function (prj) { return (_jsx(Project, { data: prj, projects: projects, acitiveProject: acitiveProject, setActiveProject: setActiveProject }, _.uniqueId())); });
    var className = classNames({ active: id === acitiveProject });
    return (_jsxs(_Fragment, { children: [_jsx("li", __assign({ className: className }, { children: _jsx("a", __assign({ href: "#", onClick: function () { return setActiveProject(id); } }, { children: name })) })), children.length > 0 &&
                (_jsx("ul", { children: children }))] }));
};
export default Project;
//# sourceMappingURL=Project.js.map