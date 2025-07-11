
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, TrendingUp, TrendingDown, Wallet, LogOut } from 'lucide-react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseChart } from '@/components/ExpenseChart';
import { ExpenseList } from '@/components/ExpenseList';
import { CategoryChart } from '@/components/CategoryChart';
import { Auth } from '@/components/Auth';
import { useAuth } from '@/contexts/AuthContext';
import { useExpenses } from '@/hooks/useExpenses';

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { expenses, loading: expensesLoading, addExpense, deleteExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Wallet className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const handleAddExpense = async (expense: Omit<any, 'id'>) => {
    try {
      await addExpense(expense);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const totalIncome = expenses
    .filter(exp => exp.type === 'income')
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  const totalExpenses = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={signOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-rose-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-r ${balance >= 0 ? 'from-blue-500 to-cyan-600' : 'from-orange-500 to-red-600'} text-white`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Balance</CardTitle>
              <Wallet className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Transaction
          </Button>
        </div>

        {/* Charts Section */}
        {!expensesLoading && expenses.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Expense Trend
                </CardTitle>
                <CardDescription>Daily expense tracking over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseChart expenses={expenses} />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-purple-600" />
                  Expense by Category
                </CardTitle>
                <CardDescription>Breakdown of your spending habits</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryChart expenses={expenses} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Expense List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest income and expense entries</CardDescription>
          </CardHeader>
          <CardContent>
            {expensesLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading transactions...</p>
              </div>
            ) : (
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            )}
          </CardContent>
        </Card>

        {/* Expense Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <ExpenseForm 
                onSubmit={handleAddExpense} 
                onCancel={() => setShowForm(false)} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
