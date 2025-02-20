import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const { authState, balances } = useAuth();
    const [ transactions, setTransactions ] = useState([]);

    const getBalanceMovements = async () => {
        try {
            const params = new URLSearchParams();
            params.append('access-token', authState.accessToken);
            params.append('client', authState.client);
            params.append('uid', authState.uid);

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

        } catch (error) {
            console.error('Error obteniendo el historial de movimientos:', error);
        }

    };
    
    useEffect(() => {
        getBalanceMovements();
    }, []); 

    return (
        <>
            <div>Home</div>
            {Object.entries(balances).map(([key, value]) => (
                <div key={key}>
                    <strong>{key.toUpperCase()}:</strong> {value}
                </div>
            ))}

            <h2>Historial de Movimientos</h2>
            {transactions.map(transaction => (
                <div key={transaction.id} className="d-flex">
                    <strong>Category:</strong> {transaction.attributes.category}
                    <strong>Amount:</strong> {transaction.attributes.amount}{transaction.attributes.currency}<br />
                </div>
            ))}
        </>
    )
}

export default Home