import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        username: null,
        email: null,
        balance: null
    })

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${apiUrl}/api/auth/check`);
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: { isAuthenticated: true, username: response.data.user.username, email: response.data.user.email, balance: response.data.user.balance }
                })
            }
        } catch (err) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    useEffect(() => {
        loadUser()
    }, []);

    const loginUser = async loginForm => {
        console.log("LOGIN FROM AUTH CONTEXT");
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, loginForm);
            const { success, message, details } = response.data;
            if (response.data.success) localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, details.token);
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return {
                success: false,
                message: error.message
            }
        }
    }

    const registerUser = async registerForm => {
        console.log("REGISTER FROM AUTH CONTEXT");
        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, registerForm);
            const { success, message } = response.data;
            console.log("AuthContext: response object: ", { success, message });
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return {
                success: false,
                message: error.message
            }
        }
    }

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, username: null, email: null, balance: null },
        });
    };

    // Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;