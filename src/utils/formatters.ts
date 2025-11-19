export const currencyFormatter = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);

export const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US');
