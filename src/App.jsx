import { useEffect, useState } from "react";
import moneyImage from "./assets/moneyImage.jpg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./Components/index";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  if (amount === 0) setAmount(null);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(() => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  }, [amount]); //when the amount changes
  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${moneyImage})` }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60  rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1 ">
                <InputBox
                  label="from"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>
              {/* SWAP button */}
              <div className="relative w-full h-0.5">
                <button
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md px-2 py-0.5 bg-green-600 text-white"
                  onClick={swap}
                  type="button"
                >
                  Swap
                </button>
              </div>
              <div className="w-full mb-1 ">
                <InputBox
                  label="to"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  amountDisabled
                  selectedCurrency={to}
                />
              </div>
              <button
                className="w-full mt-2 text-white  bg-green-600 py-2 rounded-md"
                type="submit"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
