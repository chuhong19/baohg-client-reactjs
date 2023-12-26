import { SET_AUTH } from "../contexts/constants";

export const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, username, email, balance }
    } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                username,
                email,
                balance
            }

        default:
            return state;
    }

}