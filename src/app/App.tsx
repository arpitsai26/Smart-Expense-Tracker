import { useState, useEffect } from 'react';
import { storage } from './utils/localStorage.js';
import Dashboard from './components/Dashboard.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import Analytics from './components/Analytics.jsx';
import Budget from './components/Budget.jsx';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const saved = storage.getTransactions();
    setTransactions(saved);
  }, []);

  // Add new transaction
  const handleAddTransaction = (transaction) => {
    storage.addTransaction(transaction);
    setTransactions([transaction, ...transactions]);
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    storage.deleteTransaction(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Calculate summary from transactions
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { balance: 0, income: 0, expense: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl">💰 Smart Expense Tracker</h1>
          <p className="text-purple-100 mt-1">Manage your finances smartly</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Dashboard + Budget + Analytics + Transaction List */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard summary={summary} />
            <Budget totalExpense={summary.expense} />
            <Analytics transactions={transactions} />
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>

          {/* Right Column - Transaction Form */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
