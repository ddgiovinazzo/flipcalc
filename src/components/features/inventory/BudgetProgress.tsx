import { useAppState } from '../../../context/AppStateContext';
import { useMarginMath } from '../../../hooks/useMarginMath';
import { Card } from '../../ui/Card';

export function BudgetProgress() {
  const { inventory, settings } = useAppState();
  const { calculateTotalCost } = useMarginMath();

  const totalCost = calculateTotalCost(inventory, settings.taxRate);
  const budget = settings.defaultBudget;

  // Calculate percentage, preventing division by zero
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
    </Card>
  );
}
