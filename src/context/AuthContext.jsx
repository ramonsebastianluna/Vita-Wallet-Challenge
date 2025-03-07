import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({
        accessToken: localStorage.getItem('accessToken') || '',
        client: localStorage.getItem('client') || '',
        uid: localStorage.getItem('uid') || ''
    });

    const [loading, setLoading] = useState(false);

    const logout = () => {
        setLoading(true);
        localStorage.removeItem('accessToken');
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
    
        setCredentials({
            accessToken: '',
            client: '',
            uid: ''
        });
    
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return (
        <AuthContext.Provider value={{ credentials, setCredentials, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);