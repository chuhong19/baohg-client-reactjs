import { createContext, useReducer } from "react";
import { mySellTransactionReducer } from "../reducers/mySellTransactionReducer";
import { MY_SELL_TRANSACTION_LOADED_FAIL, MY_SELL_TRANSACTION_LOADED_SUCCESS, apiUrl } from "./constants";
import axios from "axios";

export const MySellTransactionContext = createContext();

const MySellTransactionContextProvider = ({ children }) => {

    const [mySellTransactionState, dispatch] = useReducer(mySellTransactionReducer, {
        mySellTransactions: [],
        mySellTransactionsLoading: true,
    })

    // Get my buy transactions
    const getMySellTransactions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/transaction/allSellTransaction`);
            if (response.data.success) {
                dispatch({ type: MY_SELL_TRANSACTION_LOADED_SUCCESS, payload: response.data.details})
            }
        } catch (error) {
            dispatch({ type: MY_SELL_TRANSACTION_LOADED_FAIL })
        }
    }

    const mySellTransactionContextData = { mySellTransactionState, getMySellTransactions };

    return (
        <MySellTransactionContext.Provider value={mySellTransactionContextData}>
            {children}
        </MySellTransactionContext.Provider>
    )
}

export default MySellTransactionContextProvider;