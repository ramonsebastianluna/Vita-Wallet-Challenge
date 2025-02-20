import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({
        accessToken: localStorage.getItem('accessToken') || '',
        client: localStorage.getItem('client') || '',
        uid: localStorage.getItem('uid') || ''
    });

    const [balances, setBalances] = useState({})

    return (
        <AuthContext.Provider value={{ credentials, setCredentials, balances, setBalances }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);