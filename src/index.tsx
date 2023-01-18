import React, { useEffect, useState } from 'react';
import Projects from './Projects';
import Tasks from './Tasks';
import Login from './Login';
import './css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const App = () => {
    const [acitiveProject, setActiveProjectInState] = useState(-1);
    const setActiveProject = (active: number) => {
        setActiveProjectInState(active);
        localStorage.setItem("acitiveProject", active.toString());
    };

    useEffect(() => {

    }, []);
    return (<>
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#">✔ Todoapp</Navbar.Brand>
            </Container>
        </Navbar>
        <Row>
            <Col sm={12} md={3}>
                <Projects acitiveProject={acitiveProject} setActiveProject={setActiveProject} />
            </Col>
            <Col>
                <Tasks acitiveProject={acitiveProject} />
            </Col>
        </Row>
    </>
    );
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            try {
                await axios.get("/user");
                return null;
            } catch (error) {
                // console.log(error.response.data.error)
                return redirect("/login");
            }
        },
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

const container: HTMLElement = document.getElementById('app')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
