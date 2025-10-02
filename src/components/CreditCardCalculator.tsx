import React, { useEffect, useState } from 'react';
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

const CreditCardCalculator: React.FC = () => {
  // Default values as specified
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlySpend: 2000,
    balanceCarriedPercent: 20,
    apr: 23
  });

  const [investmentInputs, setInvestmentInputs] = useState<InvestmentInputs>({
    timePeriod: 5,
    returnRate: 9
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Add loaded class after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Calculations
  const carriedBalance = inputs.monthlySpend * (inputs.balanceCarriedPercent / 100);
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
    <div className={`min-h-screen transition-all duration-1000 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-ping delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4">
        {/* Header with Dark Mode Toggle */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className="w-16"></div> {/* Spacer */}
            <div className="flex-1">
              <h1 className={`text-4xl md:text-6xl font-black bg-gradient-to-r ${
                darkMode
                  ? 'from-white via-blue-200 to-purple-200'
                  : 'from-gray-900 via-blue-600 to-purple-600'
              } bg-clip-text text-transparent mb-4 animate-fade-in-up`}>
                Stop paying card interest — invest it instead
              </h1>
              <p className={`text-lg md:text-xl font-medium max-w-4xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } animate-fade-in-up delay-200`}>
                Quickly estimate your annual interest on a typical credit card vs{' '}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 border border-gray-600'
                    : 'bg-gray-200 text-gray-800'
                }`}>SP Zero (0% APR)</span>{' '}
                and see what investing that money at 9% could grow to.
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-16 h-16 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-12 ${
                darkMode
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-gray-800/25'
              }`}
            >
              <div className="flex items-center justify-center text-2xl">
                {darkMode ? '☀️' : '🌙'}
              </div>
            </button>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 ${
          darkMode
            ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700/50'
            : 'bg-white/80 backdrop-blur-xl border border-white/20'
        }`}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative z-10 p-8 xl:p-10">
            <div className="flex items-center mb-8">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl mr-4 shadow-lg`}>
                💳
              </div>
              <h2 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your current card — inputs
              </h2>
            </div>

            <div className="space-y-8">
              {/* Monthly Spend */}
              <div className="group/input">
                <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Average monthly spend ($)
                  <span className={`ml-2 text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>(e.g. 2,000)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className={`text-2xl ${
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
                    className={`w-full pl-12 pr-20 py-4 text-xl font-medium rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
                      darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                        : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                    } backdrop-blur-sm`}
                    placeholder="2000"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex flex-col">
                    <button
                      onClick={() => handleInputChange('monthlySpend', (inputs.monthlySpend || 0) + 100)}
                      className={`text-lg transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleInputChange('monthlySpend', Math.max(0, (inputs.monthlySpend || 0) - 100))}
                      className={`text-lg transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              {/* Balance Carried */}
              <div className="group/input">
                <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Average balance carried (not fully repaid)
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
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-600/50">
                  <span className={`text-sm font-semibold ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Carried: <span className="text-blue-600 dark:text-blue-400">{inputs.balanceCarriedPercent}%</span> →
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                      darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'
                    }`}>
                      ${carriedBalance.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>

              {/* APR */}
              <div className="group/input">
                <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  APR (%)
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
                    className={`w-full pl-4 pr-20 py-4 text-xl font-medium rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                      darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                        : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                    } backdrop-blur-sm`}
                    placeholder="23"
                  />
                  <span className={`absolute right-12 top-1/2 transform -translate-y-1/2 text-sm font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>%</span>
                  <div className="absolute inset-y-0 right-0 pr-4 flex flex-col">
                    <button
                      onClick={() => handleInputChange('apr', (inputs.apr || 0) + 0.1)}
                      className={`text-lg transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleInputChange('apr', Math.max(0, (inputs.apr || 0) - 0.1))}
                      className={`text-lg transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Annual interest = (APR/100 ÷ 365) x days carried x carried balance x 12
              </p>
            </div>
          </div>
        </div>

        {/* Cost Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Standard Credit Card */}
          <div className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 ${
            darkMode
              ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700/50'
              : 'bg-white/80 backdrop-blur-xl border border-white/20'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/5 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white text-2xl mr-4 shadow-lg">
                  ⚠️
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Standard Credit Card</h3>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-3 py-1 rounded-full font-semibold">
                    With Interest
                  </span>
                </div>
              </div>
              <div className={`space-y-2 text-sm mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>Monthly Spend: <span className="font-semibold">${inputs.monthlySpend.toLocaleString()}</span></p>
                <p>Balance Carried: <span className="font-semibold">${carriedBalance.toLocaleString()}</span></p>
              </div>
              <div className={`text-4xl font-black ${
                isAnimating ? 'animate-pulse' : ''
              } text-red-600`}>
                ${annualInterest.toLocaleString()}
              </div>
            </div>
          </div>

          {/* SPZero Card */}
          <div className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 ${
            darkMode
              ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700/50'
              : 'bg-white/80 backdrop-blur-xl border border-white/20'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl mr-4 shadow-lg">
                  💚
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>SPZero Card</h3>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full font-semibold">
                    0% APR
                  </span>
                </div>
              </div>
              <div className={`space-y-2 text-sm mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>Monthly Spend: <span className="font-semibold">${inputs.monthlySpend.toLocaleString()}</span></p>
                <p>Balance Carried: <span className="font-semibold">${carriedBalance.toLocaleString()}</span></p>
              </div>
              <div className="text-4xl font-black text-green-600 mb-2">
                $0
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="line-through">${annualInterest.toLocaleString()}</span> saved
              </div>
            </div>
          </div>
        </div>

        {/* Investment Calculator */}
        <div className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 mt-8 ${
          darkMode
            ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700/50'
            : 'bg-white/80 backdrop-blur-xl border border-white/20'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative z-10 p-8 xl:p-10">
            <div className="flex items-center mb-8">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl mr-4 shadow-lg`}>
                📈
              </div>
              <h2 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Investment Calculator Settings
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group/input">
                <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={investmentInputs.timePeriod || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : Number(e.target.value);
                    handleInvestmentChange('timePeriod', value);
                  }}
                  className={`w-full px-4 py-4 text-xl font-medium rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                    darkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                      : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                  } backdrop-blur-sm`}
                  min="1"
                  max="30"
                  placeholder="5"
                  aria-label="Investment time period in years"
                  title="Enter the number of years for investment growth"
                />
              </div>
              <div className="group/input">
                <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Return Rate (%)
                </label>
                <input
                  type="number"
                  value={investmentInputs.returnRate || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : Number(e.target.value);
                    handleInvestmentChange('returnRate', value);
                  }}
                  className={`w-full px-4 py-4 text-xl font-medium rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 ${
                    darkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
                      : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                  } backdrop-blur-sm`}
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
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardCalculator;
