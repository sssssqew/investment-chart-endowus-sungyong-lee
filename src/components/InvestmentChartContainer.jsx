import React from 'react';
import LineChart from './LineChart';
import rawInvestmentData from '../data/investment.json';
import { processInvestmentChartData, getInvestmentChartOptions } from '../config/chartConfig';

/**
 * A container component for the Investment Line Chart.
 * Handles data fetching (importing) and configuration of chart options.
 */
function InvestmentChartContainer() {
  // Process raw data into a structure that Chart.js can use (labels and datasets)
  const investmentChartData = processInvestmentChartData(rawInvestmentData);

  // Define chart specific configuration text and labels
  const title = 'This projection is based on historical returns and not garanteed.';
  const labels = {
    xAxisLabel: '', 
    yAxisLabel: 'Amount (SGD)' 
  }
  const currencySymbol = 'S$';

  // Get the full chart options object using the configured parameters
  const investmentChartOptions = getInvestmentChartOptions(title, labels, currencySymbol);

  return (
    <div className="chart-wrapper">
        <LineChart chartData={investmentChartData} chartOptions={investmentChartOptions}  />
    </div>
  )
}

export default InvestmentChartContainer;
