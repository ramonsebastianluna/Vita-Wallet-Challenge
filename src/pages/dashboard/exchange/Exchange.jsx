import { useState, useEffect } from "react";
import usePrices from "../../../hooks/usePrices";
import useBalances from "../../../hooks/useBalance";

const Exchange = () => {
    const { prices, loading, error } = usePrices();
    const { balances } = useBalances();

    const [fromCurrency, setFromCurrency] = useState("usd");
    const [toCurrency, setToCurrency] = useState("usdc");
    const [amount, setAmount] = useState("0.00");
    const [convertedAmount, setConvertedAmount] = useState("0.0000");

    useEffect(() => {
        if (amount && !isNaN(amount) && prices[fromCurrency] && prices[fromCurrency][toCurrency]) {
            const rate = prices[fromCurrency][toCurrency];
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
                    <h1 className="fs-4 fw-medium mb-4">¿Qué deseas intercambiar?</h1>

                    <div className="small text-success mb-4">Saldo disponible: U$D {balances.usd}</div>

                    <div className="d-flex">
                        <div className="mb-3 me-2">
                            <select 
                                className="form-select" 
                                value={fromCurrency} 
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                <option value="usd">USD</option>
                                <option value="usdc">USDC</option>
                                <option value="usdt">USDT</option>
                                <option value="btc">BTC</option>
                            </select>
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

                    <div className="d-flex">
                        <div className="mb-3 me-2">
                            <select 
                                className="form-select" 
                                value={toCurrency} 
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                <option value="usd">USD</option>
                                <option value="usdc">USDC</option>
                                <option value="usdt">USDT</option>
                                <option value="btc">BTC</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <div className="form-control">{convertedAmount}</div>
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-5">
                        <button className="btn btn-outline-secondary flex-fill">Atrás</button>
                        <button className="btn btn-info flex-fill text-white" style={{ backgroundColor: "#20c997" }}>
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exchange;
