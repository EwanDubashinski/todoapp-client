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
import _ from 'lodash';
import Task from './Task';
var Tasks = function (_a) {
    var acitiveProject = _a.acitiveProject, tasks = _a.tasks;
    var projectTasks = tasks
        .filter(function (task) { return task.project_id === acitiveProject; });
    return (_jsxs("div", __assign({ className: 'tasks' }, { children: [_jsx("h2", { children: "Tasks" }), _jsx("ul", { children: projectTasks
                    .filter(function (task) { return task.parent_id === null; })
                    .map(function (task) { return (_jsx(Task, { data: task, tasks: projectTasks, acitiveProject: acitiveProject }, _.uniqueId())); }) })] })));
};
// const el = <Card title="Welcome!" paragraph="To this example" />
export default Tasks;
//# sourceMappingURL=Tasks.js.map