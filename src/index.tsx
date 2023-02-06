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
    useLoaderData,
} from "react-router-dom";

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { ProjectData, UserData } from './types';
import { Nav } from 'react-bootstrap';
import Registration from './Registration';
import Activation from './Activation';
import { initial } from 'lodash';

const App = () => {
    const [projects, setProjects] = useState(new Array<ProjectData>);

    const refreshProjects = async () => {
        const res: ProjectData[] = await (await axios.get('http://localhost:8081/api/projects')).data;
        const activeProjectId = localStorage.getItem("acitiveProject")
        if (acitiveProject == null && activeProjectId != null) {
            if (activeProjectId != null) {
                const active = res.find(project => project.id == Number(activeProjectId));
                if (active) {
                    setActiveProject(active);
                }
            }
        }
        setProjects(res);
    };

    useEffect(() => {
        refreshProjects();
    }, []);

    const [acitiveProject, setActiveProjectInState] = useState<ProjectData | null>(null);
    const setActiveProject = (active: ProjectData) => {
        setActiveProjectInState(active);
        localStorage.setItem("acitiveProject", active.id.toString());
    };

    const userData: UserData = (useLoaderData() as AxiosResponse).data;
    return (<>
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#">✔ Todoapp</Navbar.Brand>
            </Container>
            <Nav>
                <Nav.Item>
                    {userData.principal.username}
                </Nav.Item>
                <Nav.Link href="/logout">
                    Logout
                </Nav.Link>
            </Nav>
        </Navbar>
        <Row>
            <Col sm={12} md={3}>
                <Projects projects={projects} refreshProjects={refreshProjects} acitiveProject={acitiveProject} setActiveProject={setActiveProject} />
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
                return await axios.get("/api/user");
            } catch (error) {
                // console.log(error.response.data.error)
                return redirect("/login");
            }
        },
    },
    {
        path: "/login",
        element: <Login />,
        loader: async () => {
            try {
                await axios.get("/api/user");
                return redirect("/");
            } catch (error) {
                return null;
            }
        },
    },
    {
        path: "/logout",
        loader: async () => {
            await axios.post("/api/logout");
            return redirect("/login");
        },
    },
    {
        path: "/registration",
        element: <Registration />
    },
    {
        path: "/activation/:code",
        loader: async ({ params }) => {
            const code = params.code;
            let data;
            try {
                data = await axios.get("/api/user/activate/" + code);
            } catch (error) {
                data = (error as AxiosError).response;
            }
            return data;
        },
        element: <Activation />
    },
]);

const container: HTMLElement = document.getElementById('app')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
