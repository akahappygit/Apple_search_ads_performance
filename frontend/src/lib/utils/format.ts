export const formatCurrency = (v: number) =>
new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export const formatNumber = (v: number) => new Intl.NumberFormat("en-US").format(v);

export const formatPercent = (v: number) => `${(v * 100).toFixed(2)}%`;