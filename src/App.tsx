import { useState } from 'react';
import { Header } from './components/layout/Header';
import { MainContainer } from './components/layout/MainContainer';
import { ItemForm } from './components/features/entry/ItemForm';
import { InventoryList } from './components/features/inventory/InventoryList';
import { SettingsView } from './components/features/settings/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'cart' | 'settings'>(
    'analyze'
  );

  return (
    <>
      <Header />

      <MainContainer>
        {activeTab === 'analyze' && <ItemForm />}
        {activeTab === 'cart' && <InventoryList />}
        {activeTab === 'settings' && <SettingsView />}
      </MainContainer>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 pb-safe z-50">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex flex-col items-center p-2 w-full transition-colors ${activeTab === 'analyze' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="text-sm font-semibold">Analyze</span>
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
    </>
  );
}
