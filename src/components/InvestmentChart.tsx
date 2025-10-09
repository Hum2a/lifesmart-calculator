import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaMoneyBillWave } from 'react-icons/fa';
import { IoMdStats } from 'react-icons/io';
import { IoStatsChart, IoTrendingUp, IoWarning } from 'react-icons/io5';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface InvestmentChartProps {
  monthlyContribution: number;
  annualRate: number;
  maxYears?: number;
  darkMode?: boolean;
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({
  monthlyContribution,
  annualRate,
  maxYears = 10,
  darkMode = false
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  }, [monthlyContribution, annualRate, maxYears]);

  // Calculate investment growth for each year
  const calculateInvestmentGrowth = (years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    // Future value of annuity formula
    const futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    return Math.round(futureValue);
  };

  // Generate data points for the chart
  const generateChartData = () => {
    const labels = [];
    const data = [];
    const totalInvested = [];

    for (let year = 0; year <= maxYears; year++) {
      labels.push(year.toString());
      data.push(calculateInvestmentGrowth(year));
      totalInvested.push(monthlyContribution * 12 * year);
    }

    return { labels, data, totalInvested };
  };

  const { labels, data, totalInvested } = generateChartData();
  const finalValue = data[data.length - 1] || 0;
  const finalInvested = totalInvested[totalInvested.length - 1] || 0;
  const totalGains = finalValue - finalInvested;

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Investment Value',
        data,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      title: {
        display: true,
        text: `Investment Growth Projection - ${maxYears} Years`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#374151',
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        callbacks: {
          title: (context: any) => {
            if (context && context.length > 0 && context[0]) {
              return `Year ${context[0].label}`;
            }
            return 'Investment Data';
          },
          label: (context: any) => {
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;
            return `${datasetLabel}: $${value.toLocaleString()}`;
          },
          afterLabel: (context: any) => {
            if (context && context.length > 0 && context[0]) {
              const year = parseInt(context[0].label);
              const invested = totalInvested[year] || 0;
              const value = data[year] || 0;
              const gains = value - invested;
              return `Gains: $${gains.toLocaleString()}`;
            }
            return '';
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Years',
          font: {
            size: 16,
            weight: 'bold' as const,
          },
          color: '#6B7280',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Investment Value ($)',
          font: {
            size: 16,
            weight: 'bold' as const,
          },
          color: '#6B7280',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        hoverBackgroundColor: '#10B981',
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 4,
      },
    },
  };

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg border ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded bg-emerald-600 flex items-center justify-center text-white text-lg mr-4">
            <IoTrendingUp className="text-xl" />
          </div>
          <div>
            <h2 className={`text-2xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Investment Growth Analysis
            </h2>
            <p className={`text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Projected growth investing{' '}
              <span className="font-semibold text-emerald-600">
                ${(monthlyContribution * 12).toLocaleString()} annually (${monthlyContribution.toFixed(2)}/month)
              </span>{' '}
              at{' '}
              <span className="font-semibold text-teal-600">{annualRate}% annual return</span>
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative h-96 w-full mb-8">
          <div className="relative z-10 h-full">
            <Line data={chartData} options={options} />
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white text-lg mx-auto mb-3">
              <FaMoneyBillWave className="text-xl" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              ${finalInvested.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">Total Invested</div>
            <div className="text-xs text-gray-500">
              Over {maxYears} years
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center text-white text-lg mx-auto mb-3">
              <IoStatsChart className="text-xl" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">
              ${finalValue.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">Final Value</div>
            <div className="text-xs text-gray-500">
              After {maxYears} years
            </div>
          </div>
        </div>

        {/* ROI and Growth Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Return on Investment</h4>
                <p className="text-gray-600">
                  Total return: <span className="font-bold text-xl">
                    {finalInvested > 0 ? ((totalGains / finalInvested) * 100).toFixed(1) : '0'}%
                  </span> over {maxYears} years
                </p>
              </div>
              <div className="text-2xl"><IoMdStats /></div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Annual Growth Rate</h4>
                <p className="text-gray-600">
                  Expected <span className="font-bold text-xl">
                    {annualRate}%
                  </span> annual return
                </p>
              </div>
              <div className="text-2xl"><IoStatsChart /></div>
            </div>
          </div>
        </div>

        {/* Year-by-Year Breakdown */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[5, 10, 15, 20, 25].filter(year => year <= maxYears).map((year, index) => {
              const yearValue = data[year] || 0;
              const yearInvested = totalInvested[year] || 0;
              const yearGains = yearValue - yearInvested;
              return (
                <div key={year} className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-center">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Year {year}</div>
                  <div className="text-lg font-bold text-emerald-600 mb-1">
                    ${yearValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">
                    +${yearGains.toLocaleString()} gains
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-lg mr-3"><IoWarning className="text-yellow-600" /></div>
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h4>
              <p className="text-sm text-yellow-800 leading-relaxed">
                This is a simplified calculation for educational purposes. Assumes monthly contributions with {annualRate}% annual return, compounded monthly.
                Actual investment returns may vary significantly. Past performance does not guarantee future results.
                Consider consulting with a financial advisor before making investment decisions. This tool is not financial advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentChart;
