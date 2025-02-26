import { useState, useEffect } from "react";
import useBalances from "../../../hooks/useBalance";
import usePrices from "../../../hooks/usePrices";

const SelectExchange = ({
        setShowResume, 
        setAmountToExchange, 
        setAmountToReceive, 
        fromCurrency, 
        setFromCurrency, 
        toCurrency, 
        setToCurrency,
        currencyOptions
    }) => {
    const { balances } = useBalances();
    const { prices } = usePrices();
    const [amount, setAmount] = useState("0.00");
    const [convertedAmount, setConvertedAmount] = useState("0.0000");

    useEffect(() => {
        if (amount && !isNaN(amount) && prices[fromCurrency.code] && prices[fromCurrency.code][toCurrency.code]) {
            const rate = prices[fromCurrency.code][toCurrency.code];
            setConvertedAmount((parseFloat(amount) * rate));
        } else {
            setConvertedAmount("0.0000");
        }
    }, [amount, fromCurrency, toCurrency, prices]);

    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/[^0-9.]/g, "");
        if (value.startsWith(".")) value = "0" + value;
        setAmount(value);
    };

    const handleContinue = () => {
        setAmountToExchange(amount); // Pasa el monto original al componente padre
        setAmountToReceive(convertedAmount); // Pasa el monto convertido al componente padre
        setShowResume(true); // Muestra el siguiente paso
    };

    return (
        <div className="col-12 col-md-6 p-4">
            <h1 className="fs-4 fw-medium mb-4 f-family-open-sans-semi-bold text-dark">¿Qué deseas intercambiar?</h1>

            <div className="small text-success mb-4 f-family-open-sans-regular">Saldo disponible: {balances.usd} U$D</div>

            <h6 className="f-family-open-sans-regular">Monto a intercambiar</h6>
            <div className="d-flex">
                <div className="dropdown me-2">
                    <button
                        className="btn btn-light btn-h-38 border dropdown-toggle d-flex align-items-center justify-content-center gap-2"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        <img src={fromCurrency.icon} alt={fromCurrency.name} width="20" />
                        
                    </button>
                    <ul className="dropdown-menu">
                        {currencyOptions.map((currency) => (
                            <li key={currency.code}>
                                <button
                                    className="dropdown-item d-flex align-items-center justify-content-center"
                                    onClick={() => setFromCurrency(currency)}
                                >
                                    <img src={currency.icon} alt={currency.name} width="20" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="^\d*\.?\d*$"
                        className="form-control"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </div>
            </div>

            <h6 className="f-family-open-sans-regular">Quiero recibir</h6>
            <div className="d-flex">
                <div className="dropdown me-2">
                    <button
                        className="btn btn-light btn-h-38 border dropdown-toggle d-flex align-items-center justify-content-center gap-2"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        <img src={toCurrency.icon} alt={toCurrency.name} width="20" />
                    </button>
                    <ul className="dropdown-menu">
                        {currencyOptions.map((currency) => (
                            <li key={currency.code}>
                                <button
                                    className="dropdown-item d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => setToCurrency(currency)}
                                >
                                    <img src={currency.icon} alt={currency.name} width="20" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="input-group mb-3">
                    <div className="form-control">{convertedAmount}</div>
                </div>
            </div>

            <div className="d-flex gap-3 mt-5 f-family-open-sans-semi-bold">
                <button className="btn btn-back">Atrás</button>
                <button className="btn btn-next text-white border border-0" onClick={handleContinue}>Continuar</button>
            </div>
        </div>
    )
}

export default SelectExchange