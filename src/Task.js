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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react'; // we need this to make JSX compile
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import classNames from 'classnames';
import FormMode from './FormMode';
import ServerAction from './ServerAction';
import Modal from 'react-bootstrap/Modal';
var Task = function (_a) {
    var data = _a.data, tasks = _a.tasks, acitiveProject = _a.acitiveProject, updateTask = _a.updateTask, formState = _a.formState, setFormState = _a.setFormState, refreshTasks = _a.refreshTasks;
    // const Task = ({ data: { content, id, dateCompleted }, tasks, acitiveProject, upd }: TaskProps) => {
    var content = data.content, id = data.id, dateCompleted = data.dateCompleted;
    var showInput = formState.activeId === id && formState.formMode !== FormMode.READ;
    var _b = useState(false), showControls = _b[0], setShowControls = _b[1];
    var _c = useState(content), text = _c[0], setText = _c[1];
    var _d = useState(false), showDeleteDialog = _d[0], setShowDeleteDialog = _d[1];
    var isDone = !_.isUndefined(dateCompleted); // TODO: maybe change
    var className = classNames("col-6", { 'task-done': isDone });
    var onCheck = function () {
        var action = isDone ? ServerAction.UNDONE : ServerAction.DONE;
        updateTask(data, action);
    };
    var onDeleteClick = function () {
        setShowDeleteDialog(true);
    };
    var deleteTask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = ServerAction.DELETE;
                    return [4 /*yield*/, updateTask(data, action)];
                case 1:
                    _a.sent();
                    setFormState({ formMode: FormMode.READ, activeId: -1 });
                    return [2 /*return*/];
            }
        });
    }); };
    var onEditClick = function () {
        setFormState({ formMode: FormMode.EDIT, activeId: id });
    };
    var onCancelClick = function () {
        setFormState({ formMode: FormMode.READ, activeId: -1 });
        refreshTasks();
    };
    var onSaveClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = id === 0 ? ServerAction.CREATE : ServerAction.UPDATE;
                    return [4 /*yield*/, updateTask(__assign(__assign({}, data), { content: text }), action)];
                case 1:
                    _a.sent();
                    setFormState({ formMode: FormMode.READ, activeId: -1 });
                    return [2 /*return*/];
            }
        });
    }); };
    var onDialogClose = function () { return setShowDeleteDialog(false); };
    var onUpClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateTask(data, ServerAction.UP)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onDownClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateTask(data, ServerAction.DOWN)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onLeftClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateTask(data, ServerAction.LEFT)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onRightClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateTask(data, ServerAction.RIGHT)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var children = tasks
        .filter(function (task) { return task.parentId === id; })
        .sort(function (a, b) { var _a, _b; return ((_a = a.childOrder) !== null && _a !== void 0 ? _a : 0) - ((_b = b.childOrder) !== null && _b !== void 0 ? _b : 0); })
        .map(function (task) { return (_jsx(Task, { data: task, tasks: tasks, acitiveProject: acitiveProject, updateTask: updateTask, formState: formState, setFormState: setFormState, refreshTasks: refreshTasks }, _.uniqueId())); });
    var taskClass = classNames("row", { "highlight": showControls });
    var element;
    if (showInput) {
        element =
            _jsxs("li", __assign({ className: 'row highlight' }, { children: [_jsx(Form.Group, __assign({ className: "col-10" }, { children: _jsx(Form.Control, { type: "text", value: text, placeholder: "What do you want to do?", onChange: function (e) { return setText(e.target.value); } }) })), _jsxs("div", __assign({ className: 'col-2' }, { children: [_jsx(Button, __assign({ variant: "outline-primary", onClick: onCancelClick, size: "sm" }, { children: "\uD83D\uDDD9" })), _jsx(Button, __assign({ variant: "outline-primary", onClick: onSaveClick, size: "sm" }, { children: "\uD83D\uDCBE" }))] }))] }));
    }
    else {
        element = _jsxs("li", __assign({ onMouseEnter: function () { return setShowControls(!isDone); }, onMouseLeave: function () { return setShowControls(false); }, className: taskClass }, { children: [_jsx(Form.Check, { className: className, defaultChecked: isDone, type: "checkbox", label: text, onChange: onCheck }), showControls && formState.formMode === FormMode.READ && (_jsxs("div", __assign({ className: 'col-6' }, { children: [_jsx(Button, __assign({ variant: "outline-primary", onClick: onUpClick, size: "sm" }, { children: "\u2B06" })), _jsx(Button, __assign({ variant: "outline-primary", onClick: onDownClick, size: "sm" }, { children: "\u2B07" })), _jsx(Button, __assign({ variant: "outline-primary", onClick: onLeftClick, size: "sm" }, { children: "\u25C0" })), _jsx(Button, __assign({ variant: "outline-primary", onClick: onRightClick, size: "sm" }, { children: "\u25B6" })), _jsx(Button, __assign({ variant: "outline-primary", onClick: onDeleteClick, size: "sm" }, { children: "\uD83D\uDDD1" })), _jsx(Button, __assign({ variant: "outline-primary", onClick: onEditClick, size: "sm" }, { children: "\u270E" }))] })))] }));
    }
    return (_jsxs(_Fragment, { children: [element, children.length > 0 &&
                (_jsx("ul", { children: children })), _jsxs(Modal, __assign({ show: showDeleteDialog, onHide: onDialogClose }, { children: [_jsx(Modal.Header, __assign({ closeButton: true }, { children: _jsx(Modal.Title, { children: "Delete task" }) })), _jsxs(Modal.Body, { children: ["Do you want to delete task \"", text, "\"?"] }), _jsxs(Modal.Footer, { children: [_jsx(Button, __assign({ variant: "secondary", onClick: onDialogClose }, { children: "Cancel" })), _jsx(Button, __assign({ variant: "primary", onClick: deleteTask }, { children: "Yes, delete it" }))] })] }))] }));
};
export default Task;
//# sourceMappingURL=Task.js.map