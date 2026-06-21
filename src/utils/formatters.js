export function formatDate(isoString) {
  if (!isoString) return '';
  // Convert YYYY-MM-DD to YYYY/MM/DD
  return isoString.replace(/-/g, '/');
}

export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}
