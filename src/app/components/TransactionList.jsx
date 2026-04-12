import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-12 text-center shadow-lg">
        <div className="size-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        <p className="text-lg font-semibold text-gray-700">No transactions yet</p>
        <p className="text-sm text-gray-500 mt-2">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-green-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white">
        <h2 className="text-xl font-bold">📋 Transaction History</h2>
        <p className="text-green-100 text-sm mt-1">{transactions.length} total transactions</p>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === 'income';
          const formattedDate = format(new Date(transaction.date), 'MMM dd, yyyy');
          const formattedTime = format(new Date(transaction.date), 'hh:mm a');

          return (
            <div
              key={transaction.id}
              className="p-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all group"
            >
              {/* Left: Category and Note */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm ${
                      isIncome
                        ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700'
                        : 'bg-gradient-to-r from-rose-100 to-red-100 text-rose-700'
                    }`}
                  >
                    {transaction.category}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 truncate">{transaction.note || 'No note'}</div>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  📅 {formattedDate} • 🕐 {formattedTime}
                </div>
              </div>

              {/* Right: Amount and Delete */}
              <div className="flex items-center gap-4 ml-4">
                <div
                  className={`text-xl font-bold tabular-nums ${
                    isIncome ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                </div>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="p-2.5 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-600 rounded-lg transition-all opacity-0 group-hover:opacity-100 shadow-md"
                  aria-label="Delete transaction"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
