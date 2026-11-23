import { useState, useEffect } from 'react';

export interface ExchangeRateData {
  rates: Record<string, number>;
}

export const CurrencyTab: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [conversionResult, setConversionResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  useEffect(() => {
    async function loadInitialCurrencies() {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/AED`);
        if (response.ok) {
          const data: ExchangeRateData = await response.json();
          const codes = Object.keys(data.rates);
          setCurrencyList(codes);
        }
      } catch (error) {
        console.error("Failed to dynamically populate currencies: ", error);
        setErrorMessage("Failed to load currency options.");
      }
    }
    loadInitialCurrencies();
  }, []);

  async function convertCurrency() {
    const numericAmount = Number(amount);

    setErrorMessage('');

    if (!numericAmount || numericAmount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      setConversionResult('');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates.');
      }
      const data: ExchangeRateData = await response.json();
      const rate: number = data.rates[toCurrency];
      const convertedAmount = (numericAmount * rate).toFixed(2);
      setConversionResult(convertedAmount);
    } 
    catch (error: any) {
      console.error('Error converting rates: ', error);
      setErrorMessage("Failed to convert currency.");
      setConversionResult('');
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto w-full h-full bg-transparent font-sans">
      {errorMessage && (
        <p className="p-3 mb-6 text-sm font-medium text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl animate-fade-in">{errorMessage}</p>
      )}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Currency Ledger & Payroll</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Convert between different currencies and manage your payroll efficiently.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-2">Ledger Card</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Amount to Convert</label>
            <input type="number" placeholder="e.g., 1000" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm placeholder-zinc-400 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Source Currency</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
                {currencyList.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Target Currency</label>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
                {currencyList.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
             </div>
          </div>
          <button onClick={convertCurrency} disabled={loading} className="mt-2 w-full bg-brand-btn hover:bg-brand-btn-hover disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white font-medium p-3.5 rounded-xl text-sm shadow-sm transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed">{loading ? 'Calculating...' : 'Convert Amount'}</button>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-4">Calculation Statement</h3>
            {conversionResult ? (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 p-4 rounded-xl text-center">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Converted Amount</p>
                  <p className="text-2xl font-black text-orange-600 dark:text-orange-400 mt-1 truncate">
                    {conversionResult} <span className="text-xs font-semibold text-zinc-500">{toCurrency}</span>
                  </p>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-col gap-2">
                  <div className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-800 pb-1">
                    <span>Base Amount:</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{amount} {fromCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Verified Live</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic text-center py-8">Enter currency amount and click convert for conversion.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}