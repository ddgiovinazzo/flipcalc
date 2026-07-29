import { useAppState } from '../../../context/AppStateContext';
import { Card } from '../../ui/Card';
import { BudgetProgress } from './BudgetProgress';
import { InventoryItem } from './InventoryItem';

export function InventoryList() {
  const { inventory, removeItem } = useAppState();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Cart</h2>

      <BudgetProgress />

      <Card className="p-0 overflow-hidden">
        {inventory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Your cart is empty.</p>
            <p className="text-sm mt-1">
              Add items to start tracking your margins.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {inventory.map((item) => (
              <InventoryItem key={item.id} item={item} onRemove={removeItem} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
