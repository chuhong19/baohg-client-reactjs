import { MY_SELL_TRANSACTION_LOADED_SUCCESS, MY_SELL_TRANSACTION_LOADED_FAIL } from "../contexts/constants";

export const mySellTransactionReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case MY_SELL_TRANSACTION_LOADED_SUCCESS:
            return {
                ...state,
                mySellTransactions: payload,
                mySellTransactionsLoading: false
            };

        case MY_SELL_TRANSACTION_LOADED_FAIL:
            return {
                ...state,
                mySellTransactions: [],
                mySellTransactionsLoading: false
            };
        default:
            return state;
    }
}