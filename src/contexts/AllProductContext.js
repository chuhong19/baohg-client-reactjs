import { createContext, useReducer } from "react";
import { allProductReducer } from "../reducers/allProductReducer";
import { apiUrl, ALL_PRODUCT_LOADED_SUCCESS, ALL_PRODUCT_LOADED_FAIL } from "./constants";
import axios from "axios";

export const AllProductContext = createContext();

const AllProductContextProvider = ({children}) => {

    const [allProductState, dispatch] = useReducer(allProductReducer, {
        allProducts: [],
        allProductsLoading: true,
    })

    // Get all products
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/product/allProduct`);
            console.log('Response: ' + response.data.details);
            if (response.data.success) {
                dispatch({type: ALL_PRODUCT_LOADED_SUCCESS, payload: response.data.details})
            } 
        } catch (error) {
            dispatch({type: ALL_PRODUCT_LOADED_FAIL})
        }
    } 

    // Product context data
    const allProductContextData = { allProductState, getAllProducts };

    return (
        <AllProductContext.Provider value={allProductContextData}>
            {children}
        </AllProductContext.Provider>
    )
}

export default AllProductContextProvider