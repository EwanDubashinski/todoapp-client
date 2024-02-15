import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { AxiosResponse } from 'axios';
import { useLoaderData } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Activation = () => {
   const activationResult = useLoaderData();
   const activated = (activationResult as { status: number }).status === 200;
   const variant = activated ? "success" : "danger";
   const text = activated ?
      <>Activation succeffsul. Now you can log in with your email and password <a href="/login">here</a></> :
      <>{(activationResult as AxiosResponse).data.message}</>
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
