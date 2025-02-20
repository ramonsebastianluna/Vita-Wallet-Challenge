import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useBalances = () => {
    const { credentials } = useAuth();
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getBalances = async () => {
        try {
            const params = new URLSearchParams();
            params.append('access-token', credentials.accessToken);
            params.append('client', credentials.client);
            params.append('uid', credentials.uid);

            const response = await axios.get(
                'https://api.qa.vitawallet.io/api/profile',
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

            setBalances(response.data.data.attributes.balances);

        } catch (err) {
            console.error("Error obteniendo el historial de movimientos:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBalances();
    }, []);

    return { balances, loading, error };
};

export default useBalances;
