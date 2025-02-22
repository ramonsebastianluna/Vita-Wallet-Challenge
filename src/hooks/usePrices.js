import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const usePrices = () => {
    const { credentials } = useAuth();
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPrices = async () => {
        try {
            const params = new URLSearchParams();
            params.append('access-token', credentials.accessToken);
            params.append('client', credentials.client);
            params.append('uid', credentials.uid);

            const response = await axios.get(
                'https://api.qa.vitawallet.io/api/users/get_crypto_multi_prices',
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
            setPrices(response.data.prices);

        } catch (err) {
            console.error("Error obteniendo el historial de movimientos:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPrices();
    }, []);

    return { prices, loading, error };
};

export default usePrices;
