import { useAppState } from '../../../context/AppStateContext';
import { Card } from '../../ui/Card';
import { InventoryItem } from './InventoryItem';

export function InventoryList() {
  const { inventory, removeItem, clearCart } = useAppState();

  const handleClearCart = () => {
    if (
      window.confirm(
        'Are you sure you want to remove all items from your cart?'
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Cart</h2>

        {inventory.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors pb-1"
          >
            Clear All
          </button>
        )}
      </div>

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
