import { createContext, useReducer } from "react";
import { myTransactionReducer } from "../reducers/myTransactionReducer";
import { MY_BUY_TRANSACTION_LOADED_FAIL, MY_BUY_TRANSACTION_LOADED_SUCCESS, apiUrl } from "./constants";
import axios from "axios";

export const MyTransactionContext = createContext();

const MyTransactionContextProvider = ({ children }) => {

    const [myTransactionState, dispatch] = useReducer(myTransactionReducer, {
        myTransactions: [],
        myTransactionsLoading: true,
    })

    // Get my buy transactions
    const getMyTransactions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/transaction/allBuyTransaction`);
            if (response.data.success) {
                dispatch({ type: MY_BUY_TRANSACTION_LOADED_SUCCESS, payload: response.data.details})
            }
        } catch (error) {
            dispatch({ type: MY_BUY_TRANSACTION_LOADED_FAIL })
        }
    }

    const myTransactionContextData = { myTransactionState, getMyTransactions };

    return (
        <MyTransactionContext.Provider value={myTransactionContextData}>
            {children}
        </MyTransactionContext.Provider>
    )
}

export default MyTransactionContextProvider;