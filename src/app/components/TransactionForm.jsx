import { useState } from 'react';
import { Plus, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Other',
];

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Other'];

export default function TransactionForm({ onAddTransaction }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');

  // Get categories based on transaction type
  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate amount
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Create new transaction
    const transaction = {
      id: Date.now().toString(),
      type,
      amount: numAmount,
      category,
      date: new Date().toISOString(),
      note: note.trim() || undefined,
    };

    onAddTransaction(transaction);

    // Reset form
    setAmount('');
    setNote('');
    setCategory(type === 'expense' ? 'Food' : 'Salary');
  };

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-purple-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 text-white">
        <h2 className="text-xl font-bold">Add Transaction</h2>
        <p className="text-purple-100 text-sm mt-1">Track your income and expenses</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Transaction Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategory('Food');
              }}
              className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                type === 'expense'
                  ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-red-50 text-rose-700 shadow-lg scale-105'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ArrowDownCircle className={`size-5 mx-auto mb-1 ${type === 'expense' ? 'text-rose-600' : 'text-gray-400'}`} />
              Expense
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory('Salary');
              }}
              className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                type === 'income'
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-700 shadow-lg scale-105'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ArrowUpCircle className={`size-5 mx-auto mb-1 ${type === 'income' ? 'text-emerald-600' : 'text-gray-400'}`} />
              Income
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-purple-600">₹</span>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Note Input */}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            Note (optional)
          </label>
          <input
            id="note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition-all font-semibold text-base hover:scale-105"
        >
          <Plus className="size-5" />
          Add Transaction
        </button>
      </form>
    </div>
  );
}
