import { MyProductContext } from "../contexts/MyProductContext"
import { AuthContext } from "../contexts/AuthContext"
import { useContext, useEffect } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SingleProduct from "../components/products/SingleProduct"
import Spinner from 'react-bootstrap/esm/Spinner';

const Dashboard = () => {

    // Contexts
    const {
        authState: {
          username
        },
      } = useContext(AuthContext);

    const {
        myProductState: { myProducts, myProductsLoading },
        getMyProducts,
    } = useContext(MyProductContext)

    useEffect(() => {
        getMyProducts();
    }, []);

    let body = null;

    if (myProductsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (myProducts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to GZ market</Card.Title>
                        <Card.Text>
                            Click the button below to create your first product to sell
                        </Card.Text>
                        <Button
                            variant='primary'
                        >
                            Create product now
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {myProducts.map((product) => (
                        <Col key={product.id} className='my-2'>
                            <SingleProduct product={product} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }

    return <>{body}</>
}

export default Dashboard