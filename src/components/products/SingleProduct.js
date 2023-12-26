import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap';

const SingleProduct = ({ product: { id, name, price, description, imageUrl, sellerName } }) => (
  <Card className='shadow'>
    <Card.Body>
      <Card.Title>
        <Row>
          <Col>
            <p className='product-title'>{name}</p>
            <Badge variant='info'>Product</Badge>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text>{description}</Card.Text>
      <Card.Text>Price: ${price}</Card.Text>
      <Card.Text>ID: {id}</Card.Text>
      <Card.Text>Image URL: {imageUrl}</Card.Text>
      <Card.Text>Seller: {sellerName}</Card.Text>
    </Card.Body>
    <Link 
      to={`/createTransaction/${id}`} 
      state={{ productInfo: { id, name, price, description, imageUrl, sellerName } }}
    >
      <Button>Buy</Button>
    </Link>
  </Card>
);

export default SingleProduct;
