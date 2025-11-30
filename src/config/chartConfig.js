// src/config/chartConfig.js

// Importing utility functions for formatting dates and currencies
import { formatCurrencyValue, formatYAxisValue, formatDateToMonthYear, formatTooltipLabel } from '../utils/formatUtils';

/**
 * Constant object defining the aesthetic styles and labels for each dataset in the chart.
 */
const CHART_DATASET_STYLES = {
  netInvestment: {
    label: 'Net Investment',
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    tension: 0.4,
  },
  bottom10: {
    label: 'Bottom 10% Outcome',
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    tension: 0.4,
  },
  medium: {
    label: 'Medium Outcome',
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
    tension: 0.4,
  },
  top75: {
    label: 'Top 25% Outcome',
    borderColor: 'rgb(153, 102, 255)',
    backgroundColor: 'rgba(153, 102, 255, 0.5)',
    tension: 0.4,
  },
  benchmark: {
    label: '2.5% p.a.',
    borderColor: 'rgb(255, 159, 64)',
    backgroundColor: 'rgba(255, 159, 64, 0.5)',
    borderDash: [5, 5],
    tension: 0.4,
  },
};

/**
 * Processes raw investment data into a structure suitable for Chart.js.
 * Merges raw data points with predefined styles.
 * @param {Array<Object>} rawData - The raw data array from the JSON file.
 * @returns {Object} Chart data object containing labels and datasets.
 */
export const processInvestmentChartData = (rawData) => {
  const labels = rawData.map(item => item.yearMonth); 
  // Extracting data arrays for each line
  const totalDepositData = rawData.map(item => item.totalDeposit);
  const expected10Data = rawData.map(item => item.expectedAmounts['10']);
  const expected50Data = rawData.map(item => item.expectedAmounts['50']);
  const expected75Data = rawData.map(item => item.expectedAmounts['75']);
  const benchmarkData = rawData.map(item => item.expectedAmounts['benchmark']);

  // Combining styles with corresponding data
  const datasets = [
    { ...CHART_DATASET_STYLES.netInvestment, data: totalDepositData },
    { ...CHART_DATASET_STYLES.bottom10, data: expected10Data },
    { ...CHART_DATASET_STYLES.medium, data: expected50Data },
    { ...CHART_DATASET_STYLES.top75, data: expected75Data },
    { ...CHART_DATASET_STYLES.benchmark, data: benchmarkData },
  ];

  return {
    labels, 
    datasets,
  };
}

/**
 * Configuration for the Chart.js crosshair plugin.
 */
const crosshair = {
  enabled: true, 
  line: {
    color: '#3e95cd',
    width: 1,
    dashPattern: [5, 5]
  },
  sync: {
    enabled: false,
    mode: 'x'
  },
  zoom: {
    enabled: false
  }
}

// Defining a constant for font family stack for consistency
const fonts = 'Pretendard, "Wanted Sans", "Gmarket Sans", Arial, sans-serif'

/**
 * Configuration for the Chart.js tooltip.
 */
const tooltip = {
  callbacks: {
    title: function(tooltipItems) {
      const yearMonth = tooltipItems[0].label; 
      return formatDateToMonthYear(yearMonth); // Use utility function for date formatting
    },
    label: function(tooltipItem) {
      const label = tooltipItem.dataset.label || '';
      const value = tooltipItem.raw;
      return formatTooltipLabel(label, value); // Use utility function for label formatting
    }
  },
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  titleColor: '#FFFFFF',                    
  bodyColor: '#F7FAFC', 
  borderColor: 'rgba(255, 255, 255, 0.5)',
  borderWidth: 1,
  padding: 10,
  boxPadding: 8,
  bodySpacing: 7,
  titleFont: {
    size: 16,
    weight: 'bolder',
    family: fonts 
  },
  bodyFont: {
    size: 14,
    weight: 'normal',
    family: fonts
  },
  footerFont: {
    size: 10,
    weight: 'bold',
    family: fonts
  },
  animation: {
    duration: 200
  }
}

/**
 * Generates the complete options object for the investment chart.
 * Allows customization of titles, axis labels, and currency symbols.
 * @param {string} titleText - The main chart title.
 * @param {Object} labels - Axis labels { xAxisLabel, yAxisLabel }.
 * @param {string} currencySymbol - The currency symbol to display (e.g., 'S$').
 * @returns {Object} The complete Chart.js options object.
 */
export const getInvestmentChartOptions = (titleText, {xAxisLabel = '', yAxisLabel = 'Amount'}, currencySymbol = 'S$') => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
            usePointStyle: true,
            padding: 20
        }
      },
      title: {
        display: true,
        text: titleText,
      },
      tooltip,
      crosshair
    },
    scales: {
      x: {
        type: 'category', 
        display: true,
        title: {
          display: true,
          text: xAxisLabel, // Use provided x-axis label
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 0,
          callback: function(value, index, values) {
            const yearMonth = this.getLabelForValue(value);
            return formatDateToMonthYear(yearMonth); // Use utility function for date formatting
          }
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: yAxisLabel, // Use provided y-axis label
        },
        beginAtZero: false,
        ticks: {
          callback: function(value, index, values) {
            const formattedValue = formatYAxisValue(value); // Use utility function for value formatting
            return `${currencySymbol} ${formattedValue}`; // Prepend the dynamic currency symbol
          }
        },
      },
    },
  };
}
