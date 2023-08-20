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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react'; // we need this to make JSX compile
import _ from 'lodash';
import FormMode from './FormMode';
import ServerAction from './ServerAction';
import Task from './Task';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
var Tasks = function (_a) {
    var acitiveProject = _a.acitiveProject;
    // const projectTasks = tasks
    //     .filter(task => task.project_id === acitiveProject);
    var _b = useState(new Array), tasks = _b[0], setTasks = _b[1];
    var _c = useState({ formMode: FormMode.READ, activeId: -1 }), formState = _c[0], setFormState = _c[1];
    var refreshTasks = function () {
        axios
            .get('http://localhost:8080/api/items/' + acitiveProject)
            .then(function (res) { return setTasks(res.data); });
    };
    var updateTask = function (task, action) { return __awaiter(void 0, void 0, void 0, function () {
        var URI;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    switch (action) {
                        case ServerAction.DONE:
                            URI = "http://localhost:8080/api/item/done";
                            break;
                        case ServerAction.UNDONE:
                            URI = "http://localhost:8080/api/item/undone";
                            break;
                        case ServerAction.UPDATE:
                            URI = "http://localhost:8080/api/item/update";
                            break;
                        case ServerAction.CREATE:
                            URI = "http://localhost:8080/api/item/create";
                            break;
                        case ServerAction.DELETE:
                            URI = "http://localhost:8080/api/item/delete";
                            break;
                        case ServerAction.UP:
                            URI = "http://localhost:8080/api/item/up";
                            break;
                        case ServerAction.DOWN:
                            URI = "http://localhost:8080/api/item/down";
                            break;
                        case ServerAction.RIGHT:
                            URI = "http://localhost:8080/api/item/right";
                            break;
                        case ServerAction.LEFT:
                            URI = "http://localhost:8080/api/item/left";
                            break;
                        default:
                            return [2 /*return*/];
                    }
                    return [4 /*yield*/, axios.post(URI, task)];
                case 1:
                    _a.sent();
                    refreshTasks();
                    return [2 /*return*/];
            }
        });
    }); };
    var onNewClick = function () {
        var newTask = {
            content: "",
            projectId: acitiveProject,
            checked: 0,
            date_added: new Date().toISOString(),
            id: 0,
            childOrder: tasks.length
        };
        setFormState({ formMode: FormMode.CREATE, activeId: newTask.id });
        setTasks(__spreadArray(__spreadArray([], tasks, true), [newTask], false));
    };
    useEffect(function () {
        if (acitiveProject !== null)
            refreshTasks();
    }, [acitiveProject]);
    // console.log("render!")
    return (_jsxs("div", __assign({ className: 'tasks' }, { children: [_jsx("h2", { children: "Tasks" }), _jsxs("ul", __assign({ className: "overflow-auto vh-100" }, { children: [tasks
                        .filter(function (task) { return _.isUndefined(task.parentId) &&
                        _.isUndefined(task.dateCompleted); })
                        .sort(function (a, b) { var _a, _b; return ((_a = a.childOrder) !== null && _a !== void 0 ? _a : 0) - ((_b = b.childOrder) !== null && _b !== void 0 ? _b : 0); })
                        .map(function (task) { return (_jsx(Task, { data: task, tasks: tasks, acitiveProject: acitiveProject, updateTask: updateTask, formState: formState, setFormState: setFormState, refreshTasks: refreshTasks }, _.uniqueId())); }), formState.formMode === FormMode.READ && (_jsxs("li", __assign({ className: "row" }, { children: [_jsx(Button, __assign({ className: "col-1", variant: "primary", onClick: onNewClick, size: "sm" }, { children: "+" })), "Add task"] }))), tasks
                        .filter(function (task) { return !_.isUndefined(task.dateCompleted) &&
                        _.isUndefined(task.parentId); })
                        .map(function (task) { return (
                    // task.content
                    _jsx(Task, { data: task, tasks: tasks, acitiveProject: acitiveProject, updateTask: updateTask, formState: formState, setFormState: setFormState, refreshTasks: refreshTasks }, _.uniqueId())); })] }))] })));
};
// const el = <Card title="Welcome!" paragraph="To this example" />
export default Tasks;
//# sourceMappingURL=Tasks.js.map