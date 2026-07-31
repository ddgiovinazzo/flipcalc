import type { InventoryItem as ItemType } from '../../../context/AppStateContext';
import { Button } from '../../ui/Button';

interface InventoryItemProps {
  item: ItemType;
  onRemove: (id: string) => void;
}

export function InventoryItem({ item, onRemove }: InventoryItemProps) {
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-gray-800">
          {item.name || 'Unnamed Item'}
        </p>
        <div className="flex gap-3 text-sm mt-1">
          <span className="text-gray-600">
            Buy:{' '}
            <span className="font-medium text-gray-900">
              ${item.buyPrice.toFixed(2)}
            </span>
          </span>
          <span className="text-gray-600">
            Sell:{' '}
            <span className="font-medium text-gray-900">
              ${item.sellPrice.toFixed(2)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right flex flex-col items-end">
          <span
            className={`text-sm font-bold px-2 py-0.5 rounded-md ${item.calculatedMargin >= 40 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
          >
            {item.calculatedMargin.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-500 mt-1">Margin</span>
        </div>

        <Button
          variant="danger"
          className="p-2 text-sm"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
