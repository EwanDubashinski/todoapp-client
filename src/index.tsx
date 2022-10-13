import React, { useState } from 'react';
import Projects from './Projects';
import Tasks from './Tasks';
import './css/bootstrap.css';

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [acitiveProject, setActiveProjectInState] = useState(-1);
    const setActiveProject = (active: number) => {  
        setActiveProjectInState(active);
        localStorage.setItem("acitiveProject", active.toString());
    };
    return (<>
        <Projects acitiveProject={acitiveProject} setActiveProject={setActiveProject} />
        <Tasks acitiveProject={acitiveProject} />
    </>);
}

const container: HTMLElement = document.getElementById('app')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
