import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Projects from './Projects';
import Tasks from './Tasks';
import { useLoaderData } from "react-router-dom";
import { ProjectData, UserData } from './types';
import { Nav } from 'react-bootstrap';
import { fetchProjects } from './features/projects/projectsSlice';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';



const App = () => {
//    const [projects, setProjects] = useState(new Array<ProjectData>);

//    const refreshProjects = async () => {
//        const res: ProjectData[] = await (await axios.get('/api/projects')).data;
//        const activeProjectId = localStorage.getItem("acitiveProject")
//        if (acitiveProject == null && activeProjectId != null) {
//            if (activeProjectId != null) {
//                const active = res.find(project => project.id == Number(activeProjectId));
//                if (active) {
//                    setActiveProject(active);
//                }
//            }
//        }
//        setProjects(res);
//    };
    const dispatch: AppDispatch = useDispatch();
   useEffect(() => {
       dispatch(fetchProjects());
    //    refreshProjects();
   }, []);

   const [acitiveProject, setActiveProjectInState] = useState<ProjectData | null>(null);
   const setActiveProject = (active: ProjectData) => {
       if (!active.id) return;
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
               <Projects acitiveProject={acitiveProject} setActiveProject={setActiveProject} />
           </Col>
           <Col>
               <Tasks acitiveProject={acitiveProject} />
           </Col>
       </Row>
   </>
   );
}
export default App;