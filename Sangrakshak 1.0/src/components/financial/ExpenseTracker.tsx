import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, TrendingDown, TrendingUp, AlertTriangle, Eye, Trash2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const expenseCategories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const incomeCategories = [
    'Salary', 'Freelance', 'Business', 'Investment', 'Rental', 'Other'
  ];

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      description: newTransaction.description,
      date: newTransaction.date
    };

    setTransactions(prev => [transaction, ...prev]);
    setNewTransaction({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Category-wise expense data for charts
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
    
    if (t.type === 'income') {
      acc[month].income += t.amount;
    } else {
      acc[month].expenses += t.amount;
    }
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(monthlyData);

  const COLORS = ['#00E5FF', '#00FF88', '#FFD700', '#FF00FF', '#3D0070', '#00CED1', '#FF6347', '#32CD32', '#DA70D6'];

  // Overspending alerts
  const categoryBudgets = { 'Food & Dining': 15000, 'Transportation': 8000, 'Shopping': 10000 };
  const alerts = Object.entries(expensesByCategory)
    .filter(([category, amount]) => categoryBudgets[category as keyof typeof categoryBudgets] && 
             amount > categoryBudgets[category as keyof typeof categoryBudgets])
    .map(([category, amount]) => ({ category, amount, budget: categoryBudgets[category as keyof typeof categoryBudgets] }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Income</p>
                <p className="text-cyber-green font-orbitron font-bold text-xl">₹{totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyber-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Expenses</p>
                <p className="text-cyber-blue font-orbitron font-bold text-xl">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-cyber-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Balance</p>
                <p className={`font-orbitron font-bold text-xl ${balance >= 0 ? 'text-cyber-green' : 'text-red-400'}`}>
                  ₹{balance.toLocaleString()}
                </p>
              </div>
              <div className={`w-8 h-8 ${balance >= 0 ? 'text-cyber-green' : 'text-red-400'}`}>
                {balance >= 0 ? <TrendingUp /> : <TrendingDown />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Alerts</p>
                <p className="text-cyber-gold font-orbitron font-bold text-xl">{alerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-cyber-gold" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="cyber-card border-cyber-gold/50">
          <CardHeader>
            <CardTitle className="text-cyber-gold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Overspending Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-cyber-gold/10 rounded-lg">
                  <span className="text-white">{alert.category}</span>
                  <span className="text-cyber-gold font-bold">
                    ₹{alert.amount.toLocaleString()} / ₹{alert.budget.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Add Transaction Form */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-cyber-blue flex items-center">
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Type</Label>
                <Select value={newTransaction.type} onValueChange={(value: 'income' | 'expense') => 
                  setNewTransaction(prev => ({ ...prev, type: value, category: '' }))}>
                  <SelectTrigger className="bg-cyber-gray/20 border-cyber-blue/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/80">Amount (₹)</Label>
                <Input 
                  type="number" 
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/80">Category</Label>
              <Select value={newTransaction.category} onValueChange={(value) => 
                setNewTransaction(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-cyber-gray/20 border-cyber-blue/30 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(newTransaction.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">Description</Label>
              <Input 
                value={newTransaction.description}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                placeholder="Optional description"
              />
            </div>

            <div>
              <Label className="text-white/80">Date</Label>
              <Input 
                type="date" 
                value={newTransaction.date}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
              />
            </div>

            <Button onClick={addTransaction} className="w-full bg-cyber-blue hover:bg-cyber-blue/80">
              Add Transaction
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {transactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-cyber-gray/20 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{transaction.description || transaction.category}</span>
                      <button 
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-white/60 text-sm">{transaction.category} • {transaction.date}</div>
                  </div>
                  <div className={`font-orbitron font-bold ${
                    transaction.type === 'income' ? 'text-cyber-green' : 'text-cyber-blue'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  No transactions yet. Add your first transaction!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {pieData.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-white">Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #00E5FF',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-white">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #00E5FF',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="income" fill="#00FF88" />
                    <Bar dataKey="expenses" fill="#00E5FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;