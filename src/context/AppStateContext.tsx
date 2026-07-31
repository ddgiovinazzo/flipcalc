/* eslint-disable react/only-export-components */
import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Define the Shapes of our Data
export interface InventoryItem {
  id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  calculatedMargin: number;
}

export interface Settings {
  targetMargin: number;
  taxRate: number;
  defaultBudget: number;
  minProfitThreshold: number;
}

// 2. Define what the Context will expose to the rest of the app
interface AppStateContextType {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  inventory: InventoryItem[];
  setInventory: (items: InventoryItem[]) => void;
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// 3. Create the Context
const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

// 4. Create the Provider Component
export function AppStateProvider({ children }: { children: ReactNode }) {
  // Hook up localStorage for Settings with smart defaults
  const [settings, setSettings] = useLocalStorage<Settings>(
    'flipcalc_settings',
    {
      targetMargin: 40,
      defaultBudget: 100,
      taxRate: 8.375,
      minProfitThreshold: 10,
    }
  );

  // Hook up localStorage for the running inventory roster
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>(
    'flipcalc_inventory',
    []
  );

  // Helper function to keep components clean when adding items
  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(), // Native browser API for generating unique IDs offline
    };
    setInventory([...inventory, newItem]);
  };

  // Helper function for the delete button on inventory cards
  const removeItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setInventory([]);
  };

  return (
    <AppStateContext.Provider
      value={{
        settings,
        setSettings,
        inventory,
        setInventory,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

// 5. Create a Custom Hook for consuming the context easily
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
