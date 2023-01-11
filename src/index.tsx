import React, { useState } from 'react';
import Projects from './Projects';
import Tasks from './Tasks';
import './css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [acitiveProject, setActiveProjectInState] = useState(-1);
    const setActiveProject = (active: number) => {
        setActiveProjectInState(active);
        localStorage.setItem("acitiveProject", active.toString());
    };
    return (<div>
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
    </div>
    );
}

const container: HTMLElement = document.getElementById('app')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
