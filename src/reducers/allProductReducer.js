import { ALL_PRODUCT_LOADED_SUCCESS, ALL_PRODUCT_LOADED_FAIL } from "../contexts/constants";

export const allProductReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ALL_PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                allProducts: payload,
                allProductsLoading: false
            };

        case ALL_PRODUCT_LOADED_FAIL:
            return {
                ...state,
                allProducts: [],
                allProductsLoading: false
            };
        default:
            return state;
    }
}