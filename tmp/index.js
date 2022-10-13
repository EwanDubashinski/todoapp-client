import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Projects from './Projects';
import Tasks from './Tasks';
import data from './data/data';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
var App = function () {
    // const projects = await
    var _a = useState(null), acitiveProject = _a[0], setActiveProject = _a[1];
    return (_jsxs(_Fragment, { children: [_jsx(Projects, { acitiveProject: acitiveProject, setActiveProject: setActiveProject }), _jsx(Tasks, { tasks: data.items, acitiveProject: acitiveProject })] }));
};
var container = document.getElementById('app');
var root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(_jsx(App, {}));
//# sourceMappingURL=index.js.map