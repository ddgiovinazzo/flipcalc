import { useState } from 'react';
import { Header } from './components/layout/Header';
import { ItemForm } from './components/features/entry/ItemForm';
import { InventoryList } from './components/features/inventory/InventoryList';
import { SettingsView } from './components/features/settings/SettingsView';
import { BudgetProgress } from './components/features/inventory/BudgetProgress';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'cart' | 'settings'>(
    'analyze'
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Header />

      {/* 
        DESKTOP LAYOUT (md and up)
        Displays the Form and the Cart side-by-side. 
      */}
      <main className="hidden md:flex max-w-6xl mx-auto p-6 gap-8 items-start">
        <div className="w-1/3 flex flex-col gap-6">
          {/* Allow toggling between settings and form on the left pane */}
          {activeTab === 'analyze' ? <ItemForm /> : <SettingsView />}

          <button
            onClick={() =>
              setActiveTab(activeTab === 'analyze' ? 'settings' : 'analyze')
            }
            className="text-sm text-gray-500 hover:text-blue-600 underline"
          >
            {activeTab === 'analyze'
              ? 'Configure Settings'
              : 'Back to Calculator'}
          </button>
        </div>

        <div className="w-2/3">
          <BudgetProgress />
          <div className="mt-8">
            <InventoryList />
          </div>
        </div>
      </main>

      {/* 
        MOBILE LAYOUT (below md)
        Retains the original tabbed interface.
      */}
      <main className="md:hidden p-4 max-w-md mx-auto space-y-4">
        {activeTab === 'analyze' && (
          <>
            <ItemForm />
            <div className="mt-8">
              <BudgetProgress />
            </div>
          </>
        )}

        {activeTab === 'cart' && <InventoryList />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 pb-safe z-50">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex flex-col items-center p-2 w-full transition-colors ${activeTab === 'analyze' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="text-sm font-semibold">Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center p-2 w-full transition-colors ${activeTab === 'cart' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="text-sm font-semibold">Cart</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center p-2 w-full transition-colors ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="text-sm font-semibold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
