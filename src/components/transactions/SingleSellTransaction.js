
const SingleSellTransaction = ({ transaction: { id, buyerAddress, buyerMessage, buyerPhoneNumber, price, sellerId, buyerId, confirmed }, onConfirmTransaction }) => (
  <tr>
    <td>{id}</td>
    <td>{buyerAddress}</td>
    <td>{buyerMessage}</td>
    <td>{buyerPhoneNumber}</td>
    <td>{price}</td>
    <td>{sellerId}</td>
    <td>{buyerId}</td>
  </tr>
);

export default SingleSellTransaction;
