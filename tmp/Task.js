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
var Task = function (_a) {
    var _b = _a.data, content = _b.content, id = _b.id, tasks = _a.tasks, acitiveProject = _a.acitiveProject;
    var children = tasks
        .filter(function (task) { return task.parent_id === id; })
        .map(function (task) { return (_jsx(Task, { data: task, tasks: tasks, acitiveProject: acitiveProject }, _.uniqueId())); });
    // const className = classNames({ active: id === acitiveProject });
    return (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx("a", __assign({ href: "#" }, { children: content })) }), children.length > 0 &&
                (_jsx("ul", { children: children }))] }));
};
export default Task;
//# sourceMappingURL=Task.js.map