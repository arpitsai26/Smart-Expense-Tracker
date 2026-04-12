import { TrendingUp, TrendingDown, Wallet, Sparkles } from 'lucide-react';

export default function Dashboard({ summary }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-xl hover:shadow-2xl transition-shadow">
          <div className="bg-white rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <Wallet className="size-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Balance</p>
              </div>
            </div>
            <div className="text-4xl font-bold tabular-nums bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ₹{summary.balance.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <Sparkles className="size-3" />
              <span>Current balance</span>
            </div>
          </div>
        </div>

        {/* Income Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 p-[2px] shadow-xl hover:shadow-2xl transition-shadow">
          <div className="bg-white rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                <TrendingUp className="size-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Income</p>
              </div>
            </div>
            <div className="text-4xl font-bold tabular-nums bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ₹{summary.income.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="size-3" />
              <span>Money earned</span>
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-400 via-red-500 to-orange-500 p-[2px] shadow-xl hover:shadow-2xl transition-shadow">
          <div className="bg-white rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-rose-100 to-red-100 rounded-xl">
                <TrendingDown className="size-6 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Expenses</p>
              </div>
            </div>
            <div className="text-4xl font-bold tabular-nums bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              ₹{summary.expense.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-rose-600">
              <TrendingDown className="size-3" />
              <span>Money spent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
