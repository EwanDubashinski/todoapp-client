import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Activation = () => {
   const navigate = useNavigate();
   const activationResult = useLoaderData();
   const activated = (activationResult as { status: number }).status === 200;
   const variant = activated ? "success" : "danger";
   const text = activated ?
      <>Activation succeffsul. Now you can log in with your email and password <a href="/login">here</a></> :
      <>{(activationResult as AxiosResponse).data.message}</>
   // error : data.message
   return (<>
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
         <Row>
            <Alert variant={variant}>
               <Alert.Heading>Activation</Alert.Heading>
               <p>
                  {text}
               </p>
            </Alert>
         </Row>
      </Container>
   </>);
}
export default Activation;
