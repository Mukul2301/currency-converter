import { useState, useEffect } from "react";
import "./App.css";
import logo from "./currency.gif";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchange, setExchange] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/697b1e5fff2b967f6930fa5b/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res);
        setExchange(res.data.conversion_rates);
      })
      .catch((err) => {
        console.log("Error on fetching", err);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchange[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchange]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "amount":
        setAmount(value);
        break;
      case "fromCurrency":
        setFromCurrency(value);
        break;
      case "toCurrency":
        setToCurrency(value);
        break;
      default:
        break;
    }
  };
  return (
    <div className="App">
      <img
        style={{ backgroundColor: "white" }}
        src={logo}
        width={90}
        height={90}
        alt=""
      />
      <h1>Currency Converter</h1>
      <div className="exchange">
        <div className="input">
          <label className="inputLabel">Amount:</label>
          <input
            className="inputField"
            name="amount"
            type="number"
            value={amount}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label className="inputLabel">From Currency:</label>

          <select
            name="fromCurrency"
            className="inputField"
            value={fromCurrency}
            onChange={handleChange}
          >
            {Object.keys(exchange).map((currency) => (
              <option className="options" key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="input">
          <label className="inputLabel">To Currency:</label>

          <select
            name="toCurrency"
            className="inputField"
            value={toCurrency}
            onChange={handleChange}
          >
            {Object.keys(exchange).map((currency) => (
              <option className="options" key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="output">
        <h2>
          Converted Amount:
          <b className="boldResult">
            {convertedAmount} {toCurrency}
          </b>
        </h2>
      </div>
    </div>
  );
}

export default App;
