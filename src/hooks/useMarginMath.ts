import { useAppState } from '../context/AppStateContext';

export function useMarginMath() {
  const { settings } = useAppState();

  const calculateTargets = (buyPrice: number) => {
    if (!buyPrice || buyPrice <= 0) return null;

    // 1. Calculate price needed to hit target margin percentage
    // True Margin Formula: Margin = (Sale - Buy) / Sale
    // Therefore: Sale = Buy / (1 - Margin)
    const decimalMargin = settings.targetMargin / 100;
    const priceForMargin = buyPrice / (1 - decimalMargin);

    // 2. Calculate price needed to hit flat dollar threshold
    const priceForThreshold = buyPrice + settings.minProfitThreshold;

    // 3. The true minimum sale price is whichever is HIGHER
    const targetSalePrice = Math.max(priceForMargin, priceForThreshold);
    const targetProfit = targetSalePrice - buyPrice;

    // 4. Determine which rule triggered the final price (for UI feedback)
    const activeRule =
      targetSalePrice === priceForThreshold ? 'threshold' : 'margin';

    return {
      targetSalePrice,
      targetProfit,
      activeRule,
    };
  };

  return { calculateTargets };
}
