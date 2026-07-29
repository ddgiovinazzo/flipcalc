import { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { useMarginMath } from '../../../hooks/useMarginMath';
import { Card } from '../../ui/Card';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { RealTimeReport } from './RealTimeReport';

export function ItemForm() {
  const { settings, addItem } = useAppState();
  const { analyzeItem } = useMarginMath();

  const [name, setName] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  // Safely cast string inputs to numbers for the math hook
  const numBuy = Number(buyPrice) || 0;
  const numSell = Number(sellPrice) || 0;

  // Calculate the margin on the fly using the global target margin setting
  const analysis = analyzeItem(numBuy, numSell, settings.targetMargin);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    // Prevent submission of zero-dollar items
    if (numBuy <= 0 || numSell <= 0) return;

    // Send the item to the global Context array
    addItem({
      name: name.trim() || 'Unnamed Item',
      buyPrice: numBuy,
      sellPrice: numSell,
      calculatedMargin: analysis.marginPercentage,
    });

    // Clear the form for the next item
    setName('');
    setBuyPrice('');
    setSellPrice('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Analyze Item</h2>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="itemName">Item Name (Optional)</Label>
            <Input
              id="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Vintage Levi's 501"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buyPrice">Buy Cost ($)</Label>
              <Input
                id="buyPrice"
                type="number"
                step="0.01"
                min="0"
                required
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="sellPrice">Expected Sale ($)</Label>
              <Input
                id="sellPrice"
                type="number"
                step="0.01"
                min="0"
                required
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Pass the dynamic calculation to the report UI */}
          <RealTimeReport
            profitAmount={analysis.profitAmount}
            marginPercentage={analysis.marginPercentage}
            message={analysis.message}
            status={analysis.status}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={numBuy <= 0 || numSell <= 0}
            >
              Add to Cart
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
