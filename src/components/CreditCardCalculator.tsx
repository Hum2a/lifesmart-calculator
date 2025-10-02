import React, { useState } from 'react';
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

  // Calculations
  const carriedBalance = inputs.monthlySpend * (inputs.balanceCarriedPercent / 100);
  const annualInterest = carriedBalance * (inputs.apr / 100);
  const monthlySavings = annualInterest / 12;


  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleInvestmentChange = (field: keyof InvestmentInputs, value: number | null) => {
    setInvestmentInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stop paying card interest — invest it instead
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quickly estimate your annual interest on a typical credit card vs{' '}
            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">SP Zero (0% APR)</span>{' '}
            and see what investing that money at 9% could grow to.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your current card — inputs</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average monthly spend ($)
                <span className="text-gray-500 ml-1">(e.g. 2,000)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
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
                  className="w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col">
                  <button
                    onClick={() => handleInputChange('monthlySpend', (inputs.monthlySpend || 0) + 100)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleInputChange('monthlySpend', Math.max(0, (inputs.monthlySpend || 0) - 100))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average balance carried (not fully repaid)
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">0%</span>
                <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.balanceCarriedPercent}
                  onChange={(e) => handleInputChange('balanceCarriedPercent', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  aria-label="Percentage of balance carried over"
                  title={`${inputs.balanceCarriedPercent}% of balance carried over`}
                />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">100%</span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">
                  Carried: <span className="font-semibold">{inputs.balanceCarriedPercent}%</span> →
                  <span className="bg-gray-200 px-2 py-1 rounded-full ml-1">${carriedBalance.toLocaleString()}</span>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="23"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col">
                  <button
                    onClick={() => handleInputChange('apr', (inputs.apr || 0) + 0.1)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleInputChange('apr', Math.max(0, (inputs.apr || 0) - 0.1))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Annual interest = (APR/100 ÷ 365) x days carried x carried balance x 12
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Annual Cost Comparison</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-red-500 pl-4">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">Standard Credit Card</h3>
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">With Interest</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>Monthly Spend: <span className="font-medium">${inputs.monthlySpend.toLocaleString()}</span></p>
                <p>Balance Carried: <span className="font-medium">${carriedBalance.toLocaleString()}</span></p>
              </div>
              <div className="text-3xl font-bold text-red-600">
                ${annualInterest.toLocaleString()}
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">SPZero Card</h3>
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">0% APR</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>Monthly Spend: <span className="font-medium">${inputs.monthlySpend.toLocaleString()}</span></p>
                <p>Balance Carried: <span className="font-medium">${carriedBalance.toLocaleString()}</span></p>
              </div>
              <div className="text-3xl font-bold text-green-600">
                $0
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <span className="line-through">${annualInterest.toLocaleString()}</span> saved
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Investment Calculator Settings</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
              <input
                type="number"
                value={investmentInputs.timePeriod || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : Number(e.target.value);
                  handleInvestmentChange('timePeriod', value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="30"
                placeholder="5"
                aria-label="Investment time period in years"
                title="Enter the number of years for investment growth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Return Rate (%)</label>
              <input
                type="number"
                value={investmentInputs.returnRate || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : Number(e.target.value);
                  handleInvestmentChange('returnRate', value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        <InvestmentChart
          monthlyContribution={monthlySavings}
          annualRate={investmentInputs.returnRate ?? 9}
          maxYears={investmentInputs.timePeriod ?? 10}
        />
      </div>
    </div>
  );
};

export default CreditCardCalculator;
