import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Color palette for categories
const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#eab308', // yellow
  '#84cc16', // lime
  '#22c55e', // green
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#0ea5e9', // sky
  '#3b82f6', // blue
  '#6366f1', // indigo
];

export default function Analytics({ transactions }) {
  // Filter only expenses for analytics
  const expenses = transactions.filter((t) => t.type === 'expense');

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-12 text-center shadow-lg">
        <div className="size-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">📊</span>
        </div>
        <p className="text-lg font-semibold text-gray-700">No expense data yet</p>
        <p className="text-sm text-gray-500 mt-2">Add some expenses to see beautiful analytics</p>
      </div>
    );
  }

  // Group expenses by category
  const categoryData = expenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Convert to chart data format
  const chartData = Object.entries(categoryData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Calculate total expenses
  const totalExpense = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-orange-100 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-6 text-white">
        <h2 className="text-xl font-bold">📊 Spending Analytics</h2>
        <p className="text-orange-100 text-sm mt-1">
          Total Expenses: ₹{totalExpense.toLocaleString('en-IN')}
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Category Breakdown</h3>
            {chartData.map((item, index) => {
              const percentage = ((item.value / totalExpense) * 100).toFixed(1);
              return (
                <div key={item.name} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-4 rounded-full shadow-md"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-sm font-bold tabular-nums text-gray-800">
                      ₹{item.value.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-white rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full transition-all rounded-full"
                        style={{
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${COLORS[index % COLORS.length]}, ${COLORS[index % COLORS.length]}dd)`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-600 w-12 text-right tabular-nums">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
