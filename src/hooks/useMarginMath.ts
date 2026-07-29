interface MarginResult {
  profitAmount: number;
  marginPercentage: number;
  isGoodBuy: boolean;
  message: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function useMarginMath() {
  const analyzeItem = (
    buyPrice: number,
    sellPrice: number,
    targetMargin: number
  ): MarginResult => {
    // Handle empty or invalid states gracefully
    if (sellPrice <= 0 || buyPrice < 0) {
      return {
        profitAmount: 0,
        marginPercentage: 0,
        isGoodBuy: false,
        message: 'Awaiting valid prices...',
        status: 'info',
      };
    }

    const profitAmount = sellPrice - buyPrice;

    // Standard Gross Profit Margin formula: (Revenue - Cost of Goods) / Revenue * 100
    const marginPercentage = (profitAmount / sellPrice) * 100;

    const isGoodBuy = marginPercentage >= targetMargin;

    // Determine UI status and messaging based on the results
    let message = '';
    let status: 'success' | 'warning' | 'error' = 'success';

    if (profitAmount < 0) {
      message = 'Guaranteed Loss. Hard Pass.';
      status = 'error';
    } else if (profitAmount === 0) {
      message = 'Break Even. Pass.';
      status = 'warning';
    } else if (isGoodBuy) {
      message = `Good Buy! Margin is ${marginPercentage.toFixed(1)}%`;
      status = 'success';
    } else {
      message = `Pass. Margin is only ${marginPercentage.toFixed(1)}% (Target: ${targetMargin}%)`;
      status = 'warning';
    }

    return {
      profitAmount,
      marginPercentage,
      isGoodBuy,
      message,
      status,
    };
  };

  // Helper for checking the running cart against the budget
  const calculateTotalCost = (
    items: { buyPrice: number }[],
    taxRate: number
  ) => {
    const subtotal = items.reduce((sum, item) => sum + item.buyPrice, 0);
    const taxAmount = subtotal * (taxRate / 100);
    return subtotal + taxAmount;
  };

  return { analyzeItem, calculateTotalCost };
}
