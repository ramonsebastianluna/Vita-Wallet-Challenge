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
        <div className="col-12 f-family-open-sans-regular">
            <div className="d-flex align-items-center">
                <button className="btn p-0 m-0" onClick={() => setShowResume(false)}><img src={backArrow} alt="back-arrow" /></button>
                <h2 className="m-0">Resumen de transacción</h2>
            </div>
            <div className="card border border-0 p-3">
                <p>Monto a intercambiar {amountToExchange}</p>
                <p>Moneda a intercambiar: {fromCurrency.name}</p>
                <p>Moneda a recibir: {toCurrency.name}</p>
                <p>Tasa de cambio</p>
                <p>Total a recibir {amountToReceive}</p>
            </div>
            <div className="d-flex gap-3 mt-5 f-family-open-sans-semi-bold">
                <button className="btn btn-back" onClick={() => setShowResume(false)}>Atrás</button>
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