import { useState, useEffect } from 'react';
import { AlertTriangle, Target } from 'lucide-react';

const STORAGE_KEY = 'expense-tracker-budget';

export default function Budget({ totalExpense }) {
  const [budget, setBudget] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Load budget from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBudget(parseFloat(saved));
    }
  }, []);

  // Save budget to localStorage
  const saveBudget = () => {
    const value = parseFloat(inputValue);
    if (value > 0) {
      setBudget(value);
      localStorage.setItem(STORAGE_KEY, value.toString());
      setIsEditing(false);
      setInputValue('');
    }
  };

  // Calculate budget usage
  const percentage = budget > 0 ? (totalExpense / budget) * 100 : 0;
  const remaining = budget - totalExpense;
  const isWarning = percentage >= 80 && percentage < 100;
  const isDanger = percentage >= 100;

  // Determine status
  let status = 'On Track';
  let statusColor = 'text-emerald-600';
  let bgColor = 'bg-emerald-50';
  let borderColor = 'border-emerald-200';

  if (isWarning) {
    status = 'Warning';
    statusColor = 'text-amber-600';
    bgColor = 'bg-amber-50';
    borderColor = 'border-amber-200';
  } else if (isDanger) {
    status = 'Over Budget';
    statusColor = 'text-red-600';
    bgColor = 'bg-red-50';
    borderColor = 'border-red-200';
  }

  if (budget === 0) {
    return (
      <div className="rounded-2xl bg-white shadow-xl border border-blue-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
            <Target className="size-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Monthly Budget</h2>
            <p className="text-sm text-gray-500">Set your spending limit</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Track your expenses against a monthly budget goal
        </p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-blue-600">₹</span>
            <input
              type="number"
              step="100"
              placeholder="Enter budget amount"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveBudget()}
              className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={saveBudget}
            className="px-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold hover:scale-105"
          >
            Set Budget
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-xl border-2 ${borderColor} ${bgColor} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${isDanger ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-emerald-100'}`}>
            {isDanger ? (
              <AlertTriangle className="size-6 text-red-700" />
            ) : isWarning ? (
              <AlertTriangle className="size-6 text-amber-700" />
            ) : (
              <Target className="size-6 text-emerald-700" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Monthly Budget</h2>
            <p className={`text-sm font-semibold ${statusColor}`}>{status}</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setInputValue(budget.toString());
            }}
            className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-4 py-2 rounded-lg transition-all"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
              <input
                type="number"
                step="100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveBudget()}
                className="w-full pl-8 pr-3 py-2.5 border border-zinc-200 text-base focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white"
                autoFocus
              />
            </div>
            <button
              onClick={saveBudget}
              className="px-6 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setInputValue('');
              }}
              className="px-6 border border-zinc-300 hover:bg-zinc-100 transition-colors bg-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">Budget Progress</div>
              <div className="text-sm font-bold tabular-nums text-gray-800">
                {percentage.toFixed(1)}%
              </div>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all rounded-full ${
                  isDanger
                    ? 'bg-gradient-to-r from-red-500 to-rose-600'
                    : isWarning
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                    : 'bg-gradient-to-r from-emerald-400 to-green-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Budget Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-60 rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1.5">Budget</div>
              <div className="text-xl font-bold tabular-nums text-gray-800">₹{budget.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white bg-opacity-60 rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1.5">Spent</div>
              <div className="text-xl font-bold tabular-nums text-gray-800">
                ₹{totalExpense.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-white bg-opacity-60 rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1.5">
                {remaining >= 0 ? 'Remaining' : 'Over'}
              </div>
              <div className={`text-xl font-bold tabular-nums ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ₹{Math.abs(remaining).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Alert Messages */}
          {isWarning && (
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-xl shadow-md">
              <AlertTriangle className="size-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-amber-900">
                ⚠️ You've used {percentage.toFixed(0)}% of your budget. Consider reducing expenses to stay on track.
              </p>
            </div>
          )}

          {isDanger && (
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-300 rounded-xl shadow-md">
              <AlertTriangle className="size-5 text-red-700 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-red-900">
                🚨 Budget exceeded by ₹{Math.abs(remaining).toLocaleString('en-IN')}! Review your spending immediately.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
