import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const useExchange = () => {
    const { credentials } = useAuth();
    const [exchange, setExchange] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeExchange = async (data) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('access-token', credentials.accessToken);
            params.append('client', credentials.client);
            params.append('uid', credentials.uid);

            const response = await axios.post(
                'https://api.qa.vitawallet.io/api/transactions/exchange',
                data,
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
            
            setExchange("exito"); //hardcodeado debido al error de la api que responde null.

        } catch (err) {
            console.error("Error al intentar hacer el intercambio:", err.response.data.message);
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return { exchange, loading, error, makeExchange };
};

export default useExchange;
