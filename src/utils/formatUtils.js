// A constant array containing abbreviated month names.
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Formats a currency value with specified precision and unit suffixes (K, M).
 * @param {number} value - The number to be formatted.
 * @param {number} [defaultMaxFrac=2] - The default maximum number of decimal places.
 * @returns {string} The formatted currency string.
 */
export const formatCurrencyValue = (value, defaultMaxFrac = 2) => {
  // Handle invalid or non-numeric values.
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  const absValue = Math.abs(value);
  let displayValue = value;
  let suffix = '';
  let maxFrac = defaultMaxFrac; 

  if (absValue >= 1000000) { // For millions (M)
    displayValue = value / 1000000;
    suffix = 'M';
    maxFrac = 2; // Always use 2 decimal places for 'M'
  } else if (absValue >= 1000) { // For thousands (K)
    displayValue = value / 1000;
    suffix = 'K';
    maxFrac = 1; // Always use 1 decimal place for 'K'
  }
  
  // Set toLocaleString options
  const options = {
    minimumFractionDigits: 0, // Keep minimum precision at 0
    maximumFractionDigits: maxFrac
  };

  return displayValue.toLocaleString('en-US', options) + suffix;
};

/**
 * Specialized formatting function for Y-axis labels (default max decimal places is 0).
 * @param {number} value - The number to be formatted.
 * @returns {string} The formatted Y-axis label string.
 */
export const formatYAxisValue = (value) => {
  // Reuse the formatCurrencyValue logic with a specific defaultMaxFrac.
  return formatCurrencyValue(value, 0); 
};


/**
 * Converts a "YYYY-MM" string to a "Month YYYY" formatted string.
 * @param {string} yearMonthStr - The date string in "YYYY-MM" format.
 * @returns {string} The formatted date string.
 */
export const formatDateToMonthYear = (yearMonthStr) => {
  // Validate input string.
  if (!yearMonthStr || typeof yearMonthStr !== 'string' || yearMonthStr.length !== 7 || yearMonthStr.indexOf('-') === -1) {
    return yearMonthStr || '';
  }

  const [year, monthNum] = yearMonthStr.split('-');
  const monthIndex = parseInt(monthNum, 10) - 1;

  // Validate month index.
  if (monthIndex < 0 || monthIndex >= monthNames.length || !monthNames[monthIndex]) {
    return yearMonthStr || '';
  }

  return `${monthNames[monthIndex]} ${year}`;
};

/**
 * Creates a formatted tooltip label string.
 * @param {string} dataLabel - The label of the dataset.
 * @param {number} value - The value to be formatted.
 * @returns {string} The complete tooltip label string.
 */
export const formatTooltipLabel = (dataLabel, value) => {
  const formattedValue = formatCurrencyValue(value); // Reuse currency formatting
  return `${dataLabel}: S$ ${formattedValue}`;
};
