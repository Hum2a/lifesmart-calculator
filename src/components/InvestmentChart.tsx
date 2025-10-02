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
import React from 'react';
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

    for (let year = 0; year <= maxYears; year++) {
      labels.push(year.toString());
      data.push(calculateInvestmentGrowth(year));
    }

    return { labels, data };
  };

  const { labels, data } = generateChartData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Investment Value',
        data,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        color: '#1F2937',
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#10B981',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => {
            return `Year ${context[0].label}`;
          },
          label: (context: any) => {
            return `Investment Value: $${context.parsed.y.toLocaleString()}`;
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
            size: 14,
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
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Investment Value ($)',
          font: {
            size: 14,
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
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <p className="text-lg text-gray-700 mb-2">
          If you invest your annual savings of{' '}
          <span className="font-bold text-green-600">
            ${(monthlyContribution * 12).toLocaleString()} (${monthlyContribution.toFixed(2)}/month)
          </span>{' '}
          at a conservative{' '}
          <span className="font-bold text-green-600">{annualRate}% annual return</span>:
        </p>
      </div>

      {/* Chart Container */}
      <div className="relative h-80 w-full">
        <Line data={chartData} options={options} />
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${data[5]?.toLocaleString() || '0'}
          </div>
          <div className="text-sm text-gray-600">After 5 Years</div>
          <div className="text-xs text-green-700 mt-1">
            +{data[5] ? ((data[5] / (monthlyContribution * 12) - 1) * 100).toFixed(1) : '0'}% growth
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${data[10]?.toLocaleString() || '0'}
          </div>
          <div className="text-sm text-gray-600">After 10 Years</div>
          <div className="text-xs text-green-700 mt-1">
            +{data[10] ? ((data[10] / (monthlyContribution * 12) - 1) * 100).toFixed(1) : '0'}% growth
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          * Assumes monthly contributions with {annualRate}% annual return, compounded monthly.
          Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
};

export default InvestmentChart;
