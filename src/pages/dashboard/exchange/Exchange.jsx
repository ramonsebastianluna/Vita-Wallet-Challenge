import { useState, useEffect } from "react";
import usePrices from "../../../hooks/usePrices";
import useBalances from "../../../hooks/useBalance";
import usd from "../../../assets/Icons/usd.png";
import usdc from "../../../assets/Icons/usdc.png";
import usdt from "../../../assets/Icons/usdt.png";
import btc from "../../../assets/Icons/btc.png";

const currencyOptions = [
    { code: "usd", name: "USD", icon: usd },
    { code: "usdc", name: "USDC", icon: usdc },
    { code: "usdt", name: "USDT", icon: usdt },
    { code: "btc", name: "BTC", icon: btc },
];

const Exchange = () => {
    const { prices } = usePrices();
    const { balances } = useBalances();

    const [fromCurrency, setFromCurrency] = useState(currencyOptions[0]);
    const [toCurrency, setToCurrency] = useState(currencyOptions[1]);
    const [amount, setAmount] = useState("0.00");
    const [convertedAmount, setConvertedAmount] = useState("0.0000");

    useEffect(() => {
        if (amount && !isNaN(amount) && prices[fromCurrency.code] && prices[fromCurrency.code][toCurrency.code]) {
            const rate = prices[fromCurrency.code][toCurrency.code];
            setConvertedAmount((parseFloat(amount) * rate).toFixed(4));
        } else {
            setConvertedAmount("0.0000");
        }
    }, [amount, fromCurrency, toCurrency, prices]);

    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/[^0-9.]/g, "");
        if (value.startsWith(".")) value = "0" + value;
        setAmount(value);
    };

    return (
        <div className="container">
            <div className="row justify-content-start">
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
                        <button className="btn btn-next text-white">Continuar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exchange;

