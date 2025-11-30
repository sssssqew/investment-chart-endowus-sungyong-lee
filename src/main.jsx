import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerChartPlugins } from './utils/chartUtils.js';

registerChartPlugins(); // Register Chart.js components and plugins once on application startup

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
