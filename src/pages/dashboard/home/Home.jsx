import useBalances from "../../../hooks/useBalance";
import useTransactions from "../../../hooks/useTransactions";

const Home = () => {
    const { balances, loading: balancesLoading, error: balancesError } = useBalances();
    const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions();

    return (
        <>
            <div>Home</div>

            {balancesLoading && <p>Cargando saldos...</p>}
            {balancesError && <p>Error al cargar saldos: {balancesError.message}</p>}
            
            {Object.entries(balances).map(([key, value]) => (
                <div key={key}>
                    <strong>{key.toUpperCase()}:</strong> {value}
                </div>
            ))}

            <h2>Historial de Movimientos</h2>
            
            {transactionsLoading && <p>Cargando movimientos...</p>}
            {transactionsError && <p>Error al cargar movimientos: {transactionsError.message}</p>}

            {transactions.map(transaction => (
                <div key={transaction.id} className="d-flex">
                    <strong>Category:</strong> {transaction.attributes.category}
                    <strong>Amount:</strong> {transaction.attributes.amount}{transaction.attributes.currency}<br />
                </div>
            ))}
        </>
    );
};

export default Home;
