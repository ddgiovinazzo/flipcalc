import { Alert } from '../../ui/Alert';

interface RealTimeReportProps {
  profitAmount: number;
  marginPercentage: number;
  message: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function RealTimeReport({
  profitAmount,
  marginPercentage,
  message,
  status,
}: RealTimeReportProps) {
  // Show a neutral state before the user starts typing valid numbers
  if (status === 'info') {
    return (
      <Alert status="info" className="mt-4">
        {message}
      </Alert>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
            Est. Profit
          </p>
          <p
            className={`text-xl font-bold ${profitAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            ${profitAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
            Gross Margin
          </p>
          <p className="text-xl font-bold text-gray-800">
            {marginPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      <Alert status={status}>{message}</Alert>
    </div>
  );
}
