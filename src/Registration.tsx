import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
   const [email, setEmail] = useState("");
   const [name, setName] = useState("");
   const [pwd, setPwd] = useState("");
   const [pwd2, setPwd2] = useState("");
   const navigate = useNavigate();


   const submit = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", pwd);
      formData.append("matchingPassword", pwd2);

      axios.post("/api/user/registration", formData)
      .then(() => {
         alert("Please activate your email");
         navigate("/login");
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
               <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                     We'll never share your email with anyone else.
                  </Form.Text>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                  <Form.Text className="text-muted">
                     Display name
                  </Form.Text>
               </Form.Group>
               <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formPasswordRepeat">
                  <Form.Label>Password repeat</Form.Label>
                  <Form.Control type="password" placeholder="Password repeat" onChange={(e) => setPwd2(e.target.value)} />
               </Form.Group>
               <Button variant="primary" type="submit" onClick={submit}>
                  Submit
               </Button>
            </Form>
         </Row>
      </Container>
   </>);
}
export default Registration;
