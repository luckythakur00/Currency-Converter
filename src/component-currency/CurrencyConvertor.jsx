import React, { useEffect } from 'react'
import CurrencyDropdown from './CurrencyDropdown'
import { useState } from 'react'

function CurrencyConvertor() {

  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState("INR")
  const [amount, setAmount] = useState('')
  const [convertedAmount, setConvertedAmount] = useState('')
  const [currencies, setCurrencies] = useState([]);

  const swapp = () => {
    setFrom(to)
    setTo(from)
  }

  const fetchCurrencies = async () => {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await res.json();
    setCurrencies(Object.keys(data));
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const finaldata = async () => {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    setConvertedAmount(data.rates[to] + " " + to);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700"> Currency Converter </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown selectCurrency={currencies} curency={from} setCurrencyy={setFrom} />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" onClick={swapp} >Swap</button>
        </div>
        <CurrencyDropdown selectCurrency={currencies} curency={to} setCurrencyy={setTo} />
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700" > Amount: </label>
        <input type="number" placeholder='Enter Amount Here' className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={finaldata} className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" > Convert </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600"> Converted Amount: {convertedAmount} </div>
      )}

    </div>
  )
}

export default CurrencyConvertor