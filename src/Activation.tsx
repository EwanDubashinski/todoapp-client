import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Activation = () => {
   const navigate = useNavigate();
   const activationResult = useLoaderData();
   alert(activationResult);
   return (<>
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
         <Row>
            <Alert variant="success">
               <Alert.Heading>Hey, nice to see you</Alert.Heading>
               <p>
                  Aww yeah, you successfully read this important alert message. This
                  example text is going to run a bit longer so that you can see how
                  spacing within an alert works with this kind of content.
               </p>
               <hr />
               <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep things
                  nice and tidy.
               </p>

            </Alert>
         </Row>
      </Container>
   </>);
}
export default Activation;
