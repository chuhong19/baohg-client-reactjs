import { createContext, useReducer } from "react";
import { myProductReducer } from "../reducers/myProductReducer";
import { apiUrl, MY_PRODUCT_LOADED_SUCCESS, MY_PRODUCT_LOADED_FAIL } from "./constants";
import axios from "axios";

export const MyProductContext = createContext();

const MyProductContextProvider = ({children}) => {

    const [myProductState, dispatch] = useReducer(myProductReducer, {
        myProducts: [],
        myProductsLoading: true,
    })

    // Get my products
    const getMyProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/product/myProduct`);
            if (response.data.success) {
                dispatch({type: MY_PRODUCT_LOADED_SUCCESS, payload: response.data.details})
            } 
        } catch (error) {
            dispatch({type: MY_PRODUCT_LOADED_FAIL})
        }
    } 

    // Product context data
    const myProductContextData = { myProductState, getMyProducts };

    return (
        <MyProductContext.Provider value={myProductContextData}>
            {children}
        </MyProductContext.Provider>
    )
}

export default MyProductContextProvider