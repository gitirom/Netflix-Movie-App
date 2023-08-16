import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

        useEffect(() => {
            localStorage.setItem("user", JSON.stringify(state.user)); //save the user in the localStorage and save the logging
        }, [state.user]);

    return (
        <AuthContext.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,    
            // now action can dispatch after buttons get clicked
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};