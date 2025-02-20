import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({
        accessToken: localStorage.getItem('accessToken') || '',
        client: localStorage.getItem('client') || '',
        uid: localStorage.getItem('uid') || ''
    });

    return (
        <AuthContext.Provider value={{ credentials, setCredentials }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);