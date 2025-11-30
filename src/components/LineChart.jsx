import React from 'react';
import { Line } from 'react-chartjs-2';
  
/**
 * @param {object} chartData - Chart.js data object.
 * @param {object} chartOptions - Chart.js options object.
 * @returns {JSX.Element} A component that renders a Chart.js Line chart.
 */

const LineChart = ({ chartData, chartOptions }) => {
  return (
    <div style={{
      width: '100%',  
      height: '100%', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Line data={chartData} options={chartOptions}/>
    </div>
  );
}

export default LineChart;