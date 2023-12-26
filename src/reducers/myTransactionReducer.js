import { MY_BUY_TRANSACTION_LOADED_SUCCESS, MY_BUY_TRANSACTION_LOADED_FAIL } from "../contexts/constants";

export const myTransactionReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case MY_BUY_TRANSACTION_LOADED_SUCCESS:
            return {
                ...state,
                myTransactions: payload,
                myTransactionsLoading: false
            };

        case MY_BUY_TRANSACTION_LOADED_FAIL:
            return {
                ...state,
                myTransactions: [],
                myTransactionsLoading: false
            };
        default:
            return state;
    }
}