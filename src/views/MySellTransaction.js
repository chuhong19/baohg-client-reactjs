import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { MySellTransactionContext } from "../contexts/MySellTransactionContext";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import SingleSellTransaction from "../components/transactions/SingleSellTransaction";

const MySellTransaction = () => {

    // Contexts
    const {
        authState: {
            username
        }, 
    } = useContext(AuthContext)

    const {
        mySellTransactionState: { mySellTransactions, mySellTransactionsLoading } ,
        getMySellTransactions,
    } = useContext(MySellTransactionContext)

    useEffect(() => {
        getMySellTransactions();   
    }, []);

    let body = null;

    if (mySellTransactionsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (mySellTransactions.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to GZ market</Card.Title>
                        <Card.Text>
                            You don't have any selling transaction pending
                        </Card.Text>
                        <Button
                            variant='primary'
                        >
                            Create transaction now
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
          <>
            <h1>List Selling Transaction</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Address</th>
                  <th>Message</th>
                  <th>Phone Number</th>
                  <th>Price</th>
                  <th>Buyer</th>
                  <th>Seller</th>
                </tr>
              </thead>
              <tbody>
                {mySellTransactions.map((transaction) => (
                  <SingleSellTransaction key={transaction.id} transaction={transaction} />
                ))}
              </tbody>
            </Table>
          </>
        );
      }

      return <>{body}</>;
}

export default MySellTransaction;