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

  // Calculate remaining budget
  const remainingBudget = budget - totalCost;

  // Determine progress bar color based on threshold
  let progressColor = 'bg-green-500';
  if (percentage >= 100) {
    progressColor = 'bg-red-500';
  } else if (percentage >= 80) {
    progressColor = 'bg-yellow-500';
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
            Total Est. Cost
          </p>
          <h3 className="text-2xl font-bold text-gray-900">
            ${totalCost.toFixed(2)}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
            Budget
          </p>
          <p className="font-medium text-gray-900">${budget.toFixed(2)}</p>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${progressColor}`}
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>

      {/* Dynamic Budget Status Text */}
      <div className="mt-2 text-center text-xs font-medium">
        {remainingBudget < 0 ? (
          <span className="text-red-500">
            Over Budget by ${Math.abs(remainingBudget).toFixed(2)}
          </span>
        ) : (
          <span className="text-green-600">
            ${remainingBudget.toFixed(2)} left in budget
          </span>
        )}
      </div>

      {/* New Cart Breakdown Section */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-sm space-y-1">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax ({taxRate}%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold pt-1">
          <span>Total at Register</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}
