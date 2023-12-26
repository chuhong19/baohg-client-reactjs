import { MY_PRODUCT_LOADED_SUCCESS, MY_PRODUCT_LOADED_FAIL } from "../contexts/constants";

export const myProductReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case MY_PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                myProducts: payload,
                myProductsLoading: false
            };

        case MY_PRODUCT_LOADED_FAIL:
            return {
                ...state,
                myProducts: [],
                myProductsLoading: false
            };
        default:
            return state;
    }
}