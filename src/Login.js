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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useState } from 'react';
var Login = function () {
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(""), pwd = _b[0], setPwd = _b[1];
    var submit = function (event) {
        event.preventDefault();
        axios.get("/user", {
            auth: {
                username: email,
                password: pwd
            }
        })
            .then(function () { return alert("success!"); })
            .catch(function (res) { return alert(res.message); });
    };
    // Buffer.from('your string here').toString('base64')
    return (_jsx(_Fragment, { children: _jsx(Container, __assign({ className: "d-flex align-items-center justify-content-center min-vh-100" }, { children: _jsx(Row, { children: _jsxs(Form, { children: [_jsxs(Form.Group, __assign({ className: "mb-3", controlId: "formBasicEmail" }, { children: [_jsx(Form.Label, { children: "Email address" }), _jsx(Form.Control, { type: "email", placeholder: "Enter email", onChange: function (e) { return setEmail(e.target.value); } }), _jsx(Form.Text, __assign({ className: "text-muted" }, { children: "We'll never share your email with anyone else." }))] })), _jsxs(Form.Group, __assign({ className: "mb-3", controlId: "formBasicPassword" }, { children: [_jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { type: "password", placeholder: "Password", onChange: function (e) { return setPwd(e.target.value); } })] })), _jsx(Button, __assign({ variant: "primary", type: "submit", onClick: submit }, { children: "Submit" }))] }) }) })) }));
};
export default Login;
//# sourceMappingURL=Login.js.map