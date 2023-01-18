import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
   const [email, setEmail] = useState("");
   const [pwd, setPwd] = useState("");

   const submit = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      axios.get("/user", {
         auth: {
            username: email,
            password: pwd
         }
      })
      .then(() => alert("success!"))
      .catch(res => alert(res.message));
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
               <Button variant="primary" type="submit" onClick={submit}>
                  Submit
               </Button>
            </Form>
         </Row>
      </Container>
   </>);
}
export default Login;
