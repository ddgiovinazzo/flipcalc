import { useState, useId } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { useMarginMath } from '../../../hooks/useMarginMath';
import { Card } from '../../ui/Card';

export function ItemForm() {
  const [itemName, setItemName] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const { addItem } = useAppState();
  const { calculateTargets } = useMarginMath();

  // Generate unique IDs so the mobile and desktop DOM nodes don't conflict
  const nameInputId = useId();
  const priceInputId = useId();

  const targets = calculateTargets(parseFloat(buyPrice));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !buyPrice) return;

    addItem({
      name: itemName,
      buyPrice: parseFloat(buyPrice),
      sellPrice: targets ? targets.targetSalePrice : 0,
      calculatedMargin: targets ? targets.targetProfit : 0,
    });

    setItemName('');
    setBuyPrice('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Analyze Item</h2>
      <Card className="bg-white p-6 shadow-sm border border-gray-200">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label
              htmlFor={nameInputId}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              id={nameInputId}
              name="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Vintage Sony Walkman"
            />
          </div>

          <div>
            <label
              htmlFor={priceInputId}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buy Cost ($)
            </label>
            <input
              id={priceInputId}
              name="buyPrice"
              type="number"
              step="0.01"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
            />
          </div>

          {targets && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
              <p className="text-sm text-blue-800 font-medium mb-1">
                To hit your goals, you must sell this for at least:
              </p>
              <p className="text-3xl font-bold text-blue-900">
                ${targets.targetSalePrice.toFixed(2)}
              </p>

              <p className="text-xs text-blue-600 mt-2">
                {targets.activeRule === 'threshold'
                  ? `Driven by your $${targets.targetProfit.toFixed(2)} minimum profit threshold.`
                  : `Driven by your target profit margin.`}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!itemName || !buyPrice}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </form>
      </Card>
    </div>
  );
}
