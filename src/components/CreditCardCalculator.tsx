import React, { useEffect, useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { IoCheckmark, IoMoon, IoSunny, IoTrendingUp, IoWarning } from 'react-icons/io5';
import InvestmentChart from './InvestmentChart';

interface CalculatorInputs {
  monthlySpend: number;
  balanceCarriedPercent: number;
  apr: number;
}

interface InvestmentInputs {
  timePeriod: number | null;
  returnRate: number | null;
}

interface CreditCardCalculatorProps {
  config: AppConfig;
}

const CreditCardCalculator: React.FC<CreditCardCalculatorProps> = ({ config }) => {
  // Default values as specified
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlySpend: 2000,
    balanceCarriedPercent: 50,
    apr: 23
  });

  const [investmentInputs, setInvestmentInputs] = useState<InvestmentInputs>({
    timePeriod: 10,
    returnRate: 9
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // Determine initial dark mode based on config
    let initialDarkMode = false;

    if (config.mode === 'dark') {
      initialDarkMode = true;
    } else if (config.mode === 'light') {
      initialDarkMode = false;
    } else {
      // Auto mode: check localStorage or system preference
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        initialDarkMode = savedDarkMode === 'true';
      } else {
        initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }

    setDarkMode(initialDarkMode);

    // Add loaded class after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, [config.mode]);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Only save to localStorage if in auto mode
    if (config.mode === 'auto') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode, config.mode]);

  // Calculations
  // balanceCarriedPercent now represents the percentage PAID OFF
  const paidOffBalance = inputs.monthlySpend * (inputs.balanceCarriedPercent / 100);
  const carriedBalance = inputs.monthlySpend - paidOffBalance;
  const annualInterest = carriedBalance * (inputs.apr / 100);
  const monthlySavings = annualInterest / 12;

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleInvestmentChange = (field: keyof InvestmentInputs, value: number | null) => {
    setInvestmentInputs(prev => ({ ...prev, [field]: value }));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      config.transparentBackground
        ? 'bg-transparent'
        : darkMode
        ? 'bg-gray-900'
        : 'bg-gray-50'
    } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4">
        {/* Header with Dark Mode Toggle */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className="w-16"></div> {/* Spacer */}
            <div className="flex-1">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Credit Card Interest vs Investment Calculator
              </h1>
              <p className={`text-base md:text-lg max-w-4xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Calculate your annual credit card interest costs and compare them to potential investment returns.
                Optimize your financial strategy by understanding the true cost of carrying credit card debt.
              </p>
            </div>
            {/* Only show toggle if mode is auto */}
            {config.mode === 'auto' && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                  darkMode
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 focus:ring-indigo-300'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 focus:ring-yellow-300'
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {/* Toggle Circle */}
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ease-in-out transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}>
                <div className="flex items-center justify-center h-full w-full">
                  <div className={`transition-all duration-500 ${
                    darkMode ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}>
                    <IoSunny className="text-yellow-500 text-base" />
                  </div>
                  <div className={`absolute transition-all duration-500 ${
                    darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <IoMoon className="text-indigo-600 text-base" />
                  </div>
                </div>
              </div>
              </button>
            )}
            {config.mode !== 'auto' && <div className="w-16"></div>} {/* Spacer when toggle hidden */}
          </div>
        </div>

        {/* Main Calculator Layout - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Credit Card Parameters Card */}
          <div className={`relative overflow-hidden rounded-lg shadow-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>

            <div className="relative z-10 p-8 xl:p-10">
              <div className="flex items-center mb-8">
                <div className={`w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white text-lg mr-4`}>
                  <FaCreditCard className="text-xl" />
                </div>
                <h2 className={`text-2xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Credit Card Parameters
                </h2>
              </div>

              <div className="space-y-8">
                {/* Monthly Spend */}
                <div className="group/input">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Average Monthly Spending ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className={`text-lg ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>$</span>
                    </div>
                    <input
                      type="number"
                      value={inputs.monthlySpend || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                        handleInputChange('monthlySpend', Math.max(0, value));
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || Number(e.target.value) < 0) {
                          handleInputChange('monthlySpend', 0);
                        }
                      }}
                      className={`w-full pl-8 pr-4 py-3 text-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } rounded-md`}
                      placeholder="2000"
                    />
                  </div>
                </div>

                {/* Balance Paid Off */}
                <div className="group/input">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Average Balance Paid Off Monthly (%)
                  </label>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>0%</span>
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={inputs.balanceCarriedPercent}
                        onChange={(e) => handleInputChange('balanceCarriedPercent', Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${inputs.balanceCarriedPercent}%, #e5e7eb ${inputs.balanceCarriedPercent}%, #e5e7eb 100%)`
                        }}
                        aria-label="Percentage of balance carried over"
                        title={`${inputs.balanceCarriedPercent}% of balance carried over`}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>100%</span>
                  </div>
                  <div className={`mt-3 flex items-center justify-between gap-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="flex-1">
                      <label className={`block text-xs font-medium mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Or enter exact paid off amount:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className={`text-base ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>$</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={paidOffBalance || ''}
                          onChange={(e) => {
                            const dollarAmount = e.target.value === '' ? 0 : Number(e.target.value);
                            // Calculate percentage based on dollar amount
                            if (inputs.monthlySpend > 0) {
                              const percentage = Math.round((dollarAmount / inputs.monthlySpend) * 100);
                              handleInputChange('balanceCarriedPercent', Math.min(100, Math.max(0, percentage)));
                            } else {
                              handleInputChange('balanceCarriedPercent', 0);
                            }
                          }}
                          onBlur={(e) => {
                            if (e.target.value === '' || Number(e.target.value) < 0) {
                              handleInputChange('balanceCarriedPercent', 0);
                            } else if (inputs.monthlySpend > 0) {
                              const dollarAmount = Number(e.target.value);
                              const percentage = Math.round((dollarAmount / inputs.monthlySpend) * 100);
                              if (percentage > 100) {
                                handleInputChange('balanceCarriedPercent', 100);
                              }
                            }
                          }}
                          className={`w-full pl-8 pr-4 py-2 text-base border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } rounded-md`}
                          placeholder="1000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 p-3 rounded-md ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <span className={`text-base font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Average Balance Paid Off: <span className="text-blue-600 dark:text-blue-400 font-semibold">{inputs.balanceCarriedPercent}%</span> =
                      <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
                        darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'
                      }`}>
                        ${paidOffBalance.toLocaleString()}
                      </span>
                    </span>
                  </div>
                  {/* Hidden but still calculated: Balance Carried */}
                  {/* <div className={`mt-3 p-3 rounded-md ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <span className={`text-base font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Balance Carried: <span className="text-blue-600 dark:text-blue-400 font-semibold">{100 - inputs.balanceCarriedPercent}%</span> =
                      <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
                        darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'
                      }`}>
                        ${carriedBalance.toLocaleString()}
                      </span>
                    </span>
                  </div> */}
                </div>

                {/* APR */}
                <div className="group/input">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Annual Percentage Rate (APR %)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.apr || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                        handleInputChange('apr', Math.max(0, value));
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || Number(e.target.value) < 0) {
                          handleInputChange('apr', 0);
                        }
                      }}
                      className={`w-full pl-4 pr-12 py-3 text-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } rounded-md`}
                      placeholder="23"
                    />
                    <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>%</span>
                  </div>
                </div>
              </div>

              {/* Formula Hidden */}
              {/* <div className={`mt-8 pt-6 border-t ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Annual interest = (APR/100 ÷ 365) x days carried x carried balance x 12
                </p>
              </div> */}
            </div>
          </div>

          {/* Cost Comparison Cards */}
          <div className="grid grid-cols-1 gap-6">
          {/* Standard Credit Card */}
          <div className={`relative overflow-hidden rounded-lg shadow-md border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white text-sm mr-3">
                  <IoWarning className="text-lg" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Standard Credit Card</h3>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded font-medium">
                    With Interest
                  </span>
                </div>
              </div>
              <div className={`text-xs mb-3 opacity-60 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <p>Monthly Spend: ${inputs.monthlySpend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} | Balance Carried: ${carriedBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className={`text-3xl font-bold ${
                isAnimating ? 'animate-pulse' : ''
              } text-red-600`}>
                ${annualInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <div className={`text-xs mt-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Annual Interest Cost
              </div>
            </div>
          </div>

          {/* SPZero Card */}
          <div className={`relative overflow-hidden rounded-lg shadow-md border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-white text-sm mr-3">
                  <IoCheckmark className="text-lg" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>SPZero Card</h3>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded font-medium">
                    0% APR
                  </span>
                </div>
              </div>
              <div className={`text-xs mb-3 opacity-60 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <p>Monthly Spend: ${inputs.monthlySpend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} | Balance Carried: ${carriedBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                $0.00
              </div>
              <div className={`text-xs mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Annual Interest Cost
              </div>
              <div className={`mt-4 p-3 rounded-lg ${
                darkMode ? 'bg-green-900/20 border border-green-700/30' : 'bg-green-50 border border-green-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-green-300' : 'text-green-700'
                }`}>
                  💰 Your Annual Savings
                </div>
                <div className={`text-2xl font-bold ${
                  isAnimating ? 'animate-pulse' : ''
                } text-green-600 dark:text-green-400`}>
                  ${annualInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
                <div className={`text-xs mt-1 ${
                  darkMode ? 'text-green-400/80' : 'text-green-600'
                }`}>
                  saved annually with 0% APR
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Investment Calculator */}
        <div className={`relative overflow-hidden rounded-lg shadow-lg border mt-8 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className={`w-10 h-10 rounded bg-emerald-600 flex items-center justify-center text-white text-lg mr-4`}>
                <IoTrendingUp className="text-xl" />
              </div>
              <h2 className={`text-2xl font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Investment Growth Calculator
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group/input">
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Investment Time Period (Years)
                </label>
                <input
                  type="number"
                  value={investmentInputs.timePeriod || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : Number(e.target.value);
                    handleInvestmentChange('timePeriod', value);
                  }}
                  className={`w-full px-4 py-3 text-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } rounded-md`}
                  min="1"
                  max="30"
                  placeholder="10"
                  aria-label="Investment time period in years"
                  title="Enter the number of years for investment growth"
                />
              </div>
              <div className="group/input">
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Expected Annual Return Rate (%)
                </label>
                <input
                  type="number"
                  value={investmentInputs.returnRate || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : Number(e.target.value);
                    handleInvestmentChange('returnRate', value);
                  }}
                  className={`w-full px-4 py-3 text-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } rounded-md`}
                  min="0"
                  max="20"
                  step="0.1"
                  placeholder="9"
                  aria-label="Annual return rate percentage"
                  title="Enter the expected annual return rate as a percentage"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Investment Chart */}
        <div className="mt-8">
          <InvestmentChart
            monthlyContribution={monthlySavings}
            annualRate={investmentInputs.returnRate ?? 9}
            maxYears={investmentInputs.timePeriod ?? 10}
            darkMode={darkMode}
          />
        </div>

      </div>
    </div>
  );
};

export default CreditCardCalculator;

