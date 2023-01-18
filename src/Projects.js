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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react'; // we need this to make JSX compile
import Project from './Project';
import _ from 'lodash';
import axios from 'axios';
var Projects = function (_a) {
    var setActiveProject = _a.setActiveProject, acitiveProject = _a.acitiveProject;
    var _b = useState(new Array), projects = _b[0], setProjects = _b[1];
    useEffect(function () {
        axios.get('http://localhost:8081/api/projects')
            .then(function (res) { return setProjects(res.data); })
            .then(function () { return setActiveProject(localStorage.getItem("acitiveProject")); });
    }, []);
    return (_jsxs("aside", __assign({ className: 'projects' }, { children: [_jsx("h2", { children: "Projects" }), projects
                .filter(function (prj) { return _.isUndefined(prj.parent); })
                .map(function (prj) { return (_jsx(Project, { data: prj, projects: projects, acitiveProject: acitiveProject, setActiveProject: setActiveProject }, _.uniqueId())); })] })));
};
// const el = <Card title="Welcome!" paragraph="To this example" />
export default Projects;
//# sourceMappingURL=Projects.js.map