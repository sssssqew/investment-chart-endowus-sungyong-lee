import {
  Chart as ChartJS,
  CategoryScale, // X-axis (category scale)
  LinearScale,   // Y-axis (linear scale)
  PointElement,  // Data points on the chart
  LineElement,   // Line segments connecting data points
  Title,         // Chart title
  Tooltip,       // Interactive tooltip on hover
  Legend,        // Chart legend
} from 'chart.js';

import CrosshairPlugin from 'chartjs-plugin-crosshair';

/**
 * Custom wrapper for CrosshairPlugin to handle Chart.js v4 compatibility issues.
 * It prevents errors by conditionally calling the original `afterDraw` method.
 * @param {object} plugin - The original CrosshairPlugin object.
 * @returns {object} The wrapped plugin.
 */
const CustomCrosshairPlugin = function (plugin) {  
  const originalAfterDraw = plugin.afterDraw;  
  plugin.afterDraw = function(chart, easing) {  
      if (chart && chart.crosshair) {  
        originalAfterDraw.call(this, chart, easing);  
      }  
  };  
  return plugin;  
}; 

/**
 * Registers all necessary Chart.js components and plugins.
 * This function should be called once at application startup (e.g., in `main.jsx`).
 */
export const registerChartPlugins = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    CustomCrosshairPlugin(CrosshairPlugin) 
  );
}