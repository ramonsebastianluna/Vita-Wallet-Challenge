import { useState, useEffect } from "react";
import useExchange from "../../../hooks/useExchange";
import usePrices from "../../../hooks/usePrices";
import backArrow from "/images/back-arrow.png";
import modalImg from "/images/modal-img.png";

const Resume = ({ setShowResume, amountToExchange, amountToReceive, fromCurrency, toCurrency }) => {
    const { makeExchange, loading: exchangeLoading, error: exchangeError } = useExchange();
    const { getPrices } = usePrices();
    const [showModal, setShowModal] = useState(false);
    const [exchangeAttempted, setExchangeAttempted] = useState(false);

    const handleExchange = async () => {
        const data = {
            currency_sent: fromCurrency.code,
            currency_received: toCurrency.code,
            amount_sent: amountToExchange,
        };

        await getPrices();
        await makeExchange(data);
        setExchangeAttempted(true);
    };

    useEffect(() => {
        if (exchangeAttempted && !exchangeError) {
            setShowModal(true);
        }
    }, [exchangeError, exchangeAttempted]);

    return (
        <div className="exchange col-12 col-lg-7 p-2 p-md-4 ms-0 ms-lg-5 position-relative">
            <div className="d-flex align-items-center mb-5">
                <button className="btn p-0 me-3" onClick={() => setShowResume(false)}><img src={backArrow} alt="back-arrow" width={30} height={30} /></button>
                <h2 className="fs-4 fw-medium m-0 f-family-open-sans-semi-bold text-dark">Resumen de transacción</h2>
            </div>
            <div className="card border border-0 p-3">
                <p>Monto a intercambiar {amountToExchange} {fromCurrency.name}</p>
                <p>Tasa de cambio</p>
                <p>Total a recibir {amountToReceive} {toCurrency.name}</p>
            </div>
            <div className="d-flex justify-content-between mt-5 f-family-open-sans-semi-bold position-absolute prev-next">
                <button className="btn btn-back me-3" onClick={() => setShowResume(false)}>Atrás</button>
                <button
                    className="btn btn-next text-white border border-0"
                    type="button"
                    onClick={handleExchange}
                    disabled={exchangeLoading}>
                        {exchangeLoading ? "Procesando..." : "Intercambiar"}
                </button>
            </div>
            {exchangeError ? <p className="text-danger my-3 fs-6">Error: {exchangeError}</p> : null}

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border border-0">
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img src={modalImg} alt="modal-img" />
                                    <p>¡Intercambio exitoso!</p>
                                    <p>Ya cuentas con los BTC en tu saldo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resume;