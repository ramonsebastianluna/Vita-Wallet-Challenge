import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useTransactions = () => {
    const { credentials } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getBalanceMovements = async () => {
        try {
            const params = new URLSearchParams();
            params.append('access-token', credentials.accessToken);
            params.append('client', credentials.client);
            params.append('uid', credentials.uid);

            const response = await axios.get(
                'https://api.qa.vitawallet.io/api/transactions',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'app-name': 'ANGIE',
                        'Accept': '*/*',
                        'Cache-Control': 'no-cache',
                    },
                    params: params
                }
            );

            setTransactions(response.data.data);
            
        } catch (err) {
            console.error("Error obteniendo el historial de movimientos:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBalanceMovements();
    }, []);

    return { transactions, loading, error };
};

export default useTransactions;
