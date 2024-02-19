import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState("");
   const [pwd, setPwd] = useState("");
   const navigate = useNavigate();


   const submit = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      axios.get("/api/user", {
         auth: {
            username: email,
            password: pwd
         }
      })
      .then(() => {
         alert("success!");
         navigate("/");
      })
      .catch(res => {
         alert(res.message);
      });
   };
   // Buffer.from('your string here').toString('base64')
   return (<>
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
         <Row>
            <Form>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                     We'll never share your email with anyone else.
                  </Form.Text>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
               </Form.Group>
               <Row>
                  <Col >
                     <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                     </Button>
                  </Col>
                  <Col>
                     <Button variant='secondary' onClick={() => navigate("/registration")}>Register</Button>
                  </Col>
               </Row>
            </Form>
         </Row>
      </Container>
   </>);
}
export default Login;
