import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { MyTransactionContext } from "../contexts/MyTransactionContext";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import SingleBuyTransaction from "../components/transactions/SingleBuyTransaction";
import axios from "axios";
import { apiUrl } from "../contexts/constants";

const MyBuyTransaction = () => {

    // Contexts
    const {
        authState: {
            username
        },
    } = useContext(AuthContext)

    const {
        myTransactionState: { myTransactions, myTransactionsLoading },
        getMyTransactions,
    } = useContext(MyTransactionContext)

    useEffect(() => {
        getMyTransactions();
    }, []);

    let body = null;

    const handleConfirmTransaction = async (transactionId) => {
        try {
            const response = await axios.get(`${apiUrl}/api/transaction/confirm/${transactionId}`);
            if (response.data.success) {
                console.log('Confirmed tz success');
            }
        } catch (error) {
            console.error('Error confirming transaction:', error);
        }
    }

    if (myTransactionsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (myTransactions.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to GZ market</Card.Title>
                        <Card.Text>
                            You don't have any buying transaction pending
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
                <h1>List Buying Transaction</h1>
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
                        {myTransactions.map((transaction) => (
                            <SingleBuyTransaction
                                key={transaction.id}
                                transaction={transaction}
                                onConfirmTransaction={handleConfirmTransaction}
                            />
                        ))}
                    </tbody>
                </Table>
            </>
        );
    }

    return <>{body}</>;
}

export default MyBuyTransaction;