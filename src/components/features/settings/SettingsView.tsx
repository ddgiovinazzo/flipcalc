import { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Card } from '../../ui/Card';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';

export function SettingsView() {
  // Pull the current settings and the update function from our global context
  const { settings, setSettings } = useAppState();

  // Use local state for the form inputs so we only update the global state when the user hits "Save"
  // We use ?? fallbacks to prevent crashes if the user's localStorage has an outdated schema
  const [formData, setFormData] = useState({
    targetMargin: (settings.targetMargin ?? 40).toString(),
    defaultBudget: (settings.defaultBudget ?? 100).toString(),
    taxRate: (settings.taxRate ?? 8.375).toString(),
    minProfitThreshold: (settings.minProfitThreshold ?? 10).toString(),
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();

    // Convert string inputs back to numbers before saving to context/localStorage
    setSettings({
      targetMargin: Number(formData.targetMargin) || 0,
      defaultBudget: Number(formData.defaultBudget) || 0,
      taxRate: Number(formData.taxRate) || 0,
      minProfitThreshold: Number(formData.minProfitThreshold) || 0,
    });

    // Flash a quick success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="targetMargin">Target Gross Margin (%)</Label>
            <Input
              id="targetMargin"
              name="targetMargin"
              type="number"
              step="0.1"
              value={formData.targetMargin}
              onChange={handleChange}
              placeholder="e.g., 40"
            />
            <p className="text-xs text-gray-500 mt-1">
              Items falling below this percentage will trigger a "Pass" warning.
            </p>
          </div>

          <div>
            <Label htmlFor="defaultBudget">Shopping Trip Budget ($)</Label>
            <Input
              id="defaultBudget"
              name="defaultBudget"
              type="number"
              step="1"
              value={formData.defaultBudget}
              onChange={handleChange}
              placeholder="e.g., 100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your cart tracker will turn red when you approach this limit.
            </p>
          </div>

          <div>
            <Label htmlFor="taxRate">Local Sales Tax Rate (%)</Label>
            <Input
              id="taxRate"
              name="taxRate"
              type="number"
              step="0.001"
              value={formData.taxRate}
              onChange={handleChange}
              placeholder="e.g., 8.375 for Rockland County"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used to calculate the true final cost of your running inventory.
            </p>
          </div>

          <div>
            <Label htmlFor="minProfitThreshold">
              Minimum Profit Threshold ($)
            </Label>
            <Input
              id="minProfitThreshold"
              name="minProfitThreshold"
              type="number"
              step="1"
              value={formData.minProfitThreshold}
              onChange={handleChange}
              placeholder="e.g., 10"
            />
            <p className="text-xs text-gray-500 mt-1">
              The absolute minimum flat-dollar profit required per item.
            </p>
          </div>

          <div className="pt-2" aria-live="polite">
            {showSuccess ? (
              <Alert status="success">Settings saved successfully!</Alert>
            ) : (
              <Button type="submit" className="w-full">
                Save Settings
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
