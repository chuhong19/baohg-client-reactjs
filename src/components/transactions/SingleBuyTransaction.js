import { Button } from "react-bootstrap";

const SingleBuyTransaction = ({ transaction: { id, buyerAddress, buyerMessage, buyerPhoneNumber, price, sellerId, buyerId, confirmed }, onConfirmTransaction }) => (
  <tr>
    <td>{id}</td>
    <td>{buyerAddress}</td>
    <td>{buyerMessage}</td>
    <td>{buyerPhoneNumber}</td>
    <td>{price}</td>
    <td>{sellerId}</td>
    <td>{buyerId}</td>
    <td>
      {confirmed ? (
        <Button variant="secondary" disabled>
          Confirmed
        </Button>
      ) : (
        <Button variant="primary" onClick={() => onConfirmTransaction(id)}>
          Confirm
        </Button>
      )}
    </td>
  </tr>
);

export default SingleBuyTransaction;
