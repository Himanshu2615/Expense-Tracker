
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDelete }: ExpenseListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food': 'bg-orange-100 text-orange-800',
      'Transport': 'bg-blue-100 text-blue-800',
      'Entertainment': 'bg-purple-100 text-purple-800',
      'Shopping': 'bg-pink-100 text-pink-800',
      'Bills': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Travel': 'bg-cyan-100 text-cyan-800',
      'Income': 'bg-emerald-100 text-emerald-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <TrendingUp className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-gray-500 text-lg">No transactions yet</p>
        <p className="text-gray-400 text-sm">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${expense.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                {expense.type === 'income' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">{expense.description}</h3>
                  <Badge className={`text-xs ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`text-lg font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(expense.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};
