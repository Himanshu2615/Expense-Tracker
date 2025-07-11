
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

interface ExpenseChartProps {
  expenses: Expense[];
}

export const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  // Group expenses by date
  const groupedData = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = { date, expenses: 0, income: 0 };
    }
    
    if (expense.type === 'expense') {
      acc[date].expenses += expense.amount;
    } else {
      acc[date].income += expense.amount;
    }
    
    return acc;
  }, {} as Record<string, { date: string; expenses: number; income: number }>);

  const chartData = Object.values(groupedData)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      date: new Date(item.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      expenses: item.expenses,
      income: item.income
    }));

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#6B7280' }}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#6B7280' }}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#EF4444" 
            strokeWidth={3}
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
            name="Expenses"
          />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Income"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
