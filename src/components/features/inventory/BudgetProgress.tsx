import { useAppState } from '../../../context/AppStateContext';
import { Card } from '../../ui/Card';

export function BudgetProgress() {
  const { inventory, settings } = useAppState();

  // Calculate the breakdown
  const subtotal = inventory.reduce((sum, item) => sum + item.buyPrice, 0);
  const taxRate = settings.taxRate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const totalCost = subtotal + taxAmount;

  const budget = settings.defaultBudget || 0;
  const percentage = budget > 0 ? (totalCost / budget) * 100 : 0;
  const clampedPercentage = Math.min(percentage, 100);

  // Determine progress bar color based on threshold
  let progressColor = 'bg-green-500';
  if (percentage >= 100) {
    progressColor = 'bg-red-500';
  } else if (percentage >= 80) {
    progressColor = 'bg-yellow-400';
  }

  return (
    <Card className="bg-gray-800 text-white border-none shadow-md">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Total Est. Cost
          </p>
          <h3 className="text-2xl font-bold">${totalCost.toFixed(2)}</h3>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Budget
          </p>
          <p className="font-medium">${budget.toFixed(2)}</p>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${progressColor}`}
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>

      {percentage >= 100 && (
        <p className="text-red-400 text-xs font-medium mt-2 text-center">
          Warning: Budget Exceeded
        </p>
      )}

      {/* New Cart Breakdown Section */}
      <div className="mt-4 pt-3 border-t border-gray-700 text-sm space-y-1">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Tax ({taxRate}%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-800 font-medium pt-1">
          <span>Total at Register</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}
