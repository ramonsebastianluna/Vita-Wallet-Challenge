import useBalances from "../../../hooks/useBalance";
import useTransactions from "../../../hooks/useTransactions";
import usd from "../../../assets/Icons/usd.png";
import usdc from "../../../assets/Icons/usdc.png";
import usdt from "../../../assets/Icons/usdt.png";
import btc from "../../../assets/Icons/btc.png";
import coin from "../../../assets/Icons/coin.png";


const Home = () => {
    const { balances, loading: balancesLoading, error: balancesError } = useBalances();
    const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions();

    return (
        <>  
            <div className="title-section d-flex align-items-center py-3 py-md-5">
                <img src={coin} alt="coin" width={45} height={45} />
                <h1 className="fs-2 f-family-open-sans-semi-bold mx-3">!Hola <span className="name">David!</span></h1>
            </div>

            <div className="card-section">
                <h2 className="mb-3 fs-3">Mis saldos</h2>
                
                {balancesLoading && <p>Cargando saldos...</p>}
                {balancesError && <p>Error al cargar saldos: {balancesError.message}</p>}
                <div className="container">
                    <div className="row f-family-open-sans-regular">
                        {Object.entries(balances).map(([key, value]) => (
                            <div  key={key} className="col-12 pe-0 col-md-6 col-lg-4 ps-0 pe-md-4 my-2">
                                <div className="card h-100 p-3">
                                    <div className="card-title d-flex justify-content-between">
                                        <h5 className="card-title">{key.toUpperCase()}</h5>
                                        <img 
                                            src={key === "usd" ? usd : key === "usdc" ? usdc : key === "usdt" ? usdt : btc}
                                            className="card-img"
                                            alt="moneda"
                                        />
                                    </div>
                                    <div className="card-body px-0 py-2">
                                        <p className="m-0 fw-bold">{value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="transactions-section my-4">
                <h2 className="fs-3">Historial</h2>
                
                {transactionsLoading && <p>Cargando movimientos...</p>}
                {transactionsError && <p>Error al cargar movimientos: {transactionsError.message}</p>}

                {transactions.map(transaction => (
                    <div key={transaction.id} className="d-flex justify-content-between align-items-center border-bottom">
                        <p className="m-0 py-3 px-0">{transaction.attributes.category}</p>
                        <p className="m-0 py-3 px-0">{transaction.attributes.amount}{transaction.attributes.currency}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
