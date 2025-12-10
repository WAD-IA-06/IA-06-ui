import { createContext, useContext, useState } from "react";
import { setAccessToken } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (accessToken) => {
        setAccessToken(accessToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
