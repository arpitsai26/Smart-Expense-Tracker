const STORAGE_KEY = 'expense-tracker-transactions';

export const storage = {
  // Get all transactions from localStorage
  getTransactions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Save transactions to localStorage
  saveTransactions: (transactions) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Add a new transaction
  addTransaction: (transaction) => {
    const transactions = storage.getTransactions();
    storage.saveTransactions([transaction, ...transactions]);
  },

  // Delete a transaction by ID
  deleteTransaction: (id) => {
    const transactions = storage.getTransactions();
    const filtered = transactions.filter((t) => t.id !== id);
    storage.saveTransactions(filtered);
  },
};
