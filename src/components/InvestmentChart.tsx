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
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({
  monthlyContribution,
  annualRate,
  maxYears = 10
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
        label: 'Total Invested',
        data: totalInvested,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
        fill: true,
        tension: 0.4,
      },
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
      duration: 2500,
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
        text: `Investment Growth Over ${maxYears} Years`,
        font: {
          size: 20,
          weight: 'bold' as const,
        },
        color: '#1F2937',
        padding: {
          bottom: 30,
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
            return `Year ${context[0].label}`;
          },
          label: (context: any) => {
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;
            return `${datasetLabel}: $${value.toLocaleString()}`;
          },
          afterLabel: (context: any) => {
            const year = parseInt(context[0].label);
            const invested = totalInvested[year];
            const value = data[year];
            const gains = value - invested;
            return `Gains: $${gains.toLocaleString()}`;
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
    <div className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 p-8 xl:p-10">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl mr-4 shadow-lg">
            📈
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Investment Growth Projection
            </h2>
            <p className="text-lg text-gray-600">
              If you invest your annual savings of{' '}
              <span className="font-bold text-emerald-600">
                ${(monthlyContribution * 12).toLocaleString()} (${monthlyContribution.toFixed(2)}/month)
              </span>{' '}
              at a conservative{' '}
              <span className="font-bold text-teal-600">{annualRate}% annual return</span>:
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative h-96 w-full mb-8">
          <div className={`absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/80 rounded-2xl backdrop-blur-sm ${
            isAnimating ? 'animate-pulse' : ''
          }`}></div>
          <div className="relative z-10 h-full">
            <Line data={chartData} options={options} />
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`group/card relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-105 ${
            isAnimating ? 'animate-bounce' : ''
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl mx-auto mb-3">
                💰
              </div>
              <div className="text-3xl font-black text-blue-600 mb-2">
                ${finalInvested.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-blue-900 mb-1">Total Invested</div>
              <div className="text-xs text-blue-700">
                Over {maxYears} years
              </div>
            </div>
          </div>

          <div className={`group/card relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-105 ${
            isAnimating ? 'animate-bounce delay-200' : ''
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl mx-auto mb-3">
                🚀
              </div>
              <div className="text-3xl font-black text-green-600 mb-2">
                ${finalValue.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-green-900 mb-1">Final Value</div>
              <div className="text-xs text-green-700">
                After {maxYears} years
              </div>
            </div>
          </div>

          <div className={`group/card relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-105 ${
            isAnimating ? 'animate-bounce delay-400' : ''
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-600/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-xl mx-auto mb-3">
                ✨
              </div>
              <div className="text-3xl font-black text-purple-600 mb-2">
                ${totalGains.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-purple-900 mb-1">Total Gains</div>
              <div className="text-xs text-purple-700">
                {finalInvested > 0 ? ((totalGains / finalInvested) * 100).toFixed(1) : '0'}% return
              </div>
            </div>
          </div>
        </div>

        {/* ROI and Growth Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-emerald-900 mb-1">Return on Investment</h4>
                <p className="text-emerald-700">
                  Your money grew by <span className="font-black text-2xl">
                    {finalInvested > 0 ? ((totalGains / finalInvested) * 100).toFixed(1) : '0'}%
                  </span> over {maxYears} years
                </p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-blue-900 mb-1">Annual Growth Rate</h4>
                <p className="text-blue-700">
                  Average <span className="font-black text-2xl">
                    {annualRate}%
                  </span> annual return
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Year-by-Year Breakdown */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Year-by-Year Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[5, 10, 15, 20, 25].filter(year => year <= maxYears).map((year, index) => {
              const yearValue = data[year] || 0;
              const yearInvested = totalInvested[year] || 0;
              const yearGains = yearValue - yearInvested;
              return (
                <div key={year} className={`p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-center transition-all duration-300 hover:scale-105 ${
                  isAnimating ? `animate-bounce delay-${index * 200}` : ''
                }`}>
                  <div className="text-lg font-bold text-gray-900 mb-1">Year {year}</div>
                  <div className="text-2xl font-black text-emerald-600 mb-1">
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
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl">
          <div className="flex items-start">
            <div className="text-2xl mr-4">⚠️</div>
            <div>
              <h4 className="font-bold text-yellow-900 mb-2">Important Disclaimer</h4>
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
