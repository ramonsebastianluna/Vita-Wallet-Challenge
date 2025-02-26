import { useState } from "react";
import SelectExchange from "../partials/SelectExchange";
import Resume from "../partials/Resume";
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
    const [showResume, setShowResume] = useState(false);
    const [amountToExchange, setAmountToExchange] = useState(0);
    const [amountToReceive, setAmountToReceive] = useState(0);
    const [fromCurrency, setFromCurrency] = useState(currencyOptions[0]);
    const [toCurrency, setToCurrency] = useState(currencyOptions[1]);

    return (
        <div className="container">
            <div className="row justify-content-start h-100dvh">
                {showResume ? 
                    <Resume
                        setShowResume={setShowResume}
                        amountToExchange={amountToExchange}
                        amountToReceive={amountToReceive}
                        fromCurrency={fromCurrency}
                        toCurrency={toCurrency} />
                    : 
                    <SelectExchange
                        setShowResume={setShowResume}
                        setAmountToExchange={setAmountToExchange}
                        setAmountToReceive={setAmountToReceive}
                        fromCurrency={fromCurrency}
                        setFromCurrency={setFromCurrency}
                        toCurrency={toCurrency}
                        setToCurrency={setToCurrency}
                        currencyOptions={currencyOptions} />
                }
            </div>
        </div>
    );
};

export default Exchange;