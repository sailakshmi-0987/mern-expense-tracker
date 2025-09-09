import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        //const token = localStorage.getItem('token'); // token from login
        const response = await axios.get('http://localhost:5000/api/expense/fetch', {},{withCredentials:true}
        );
        setExpenses(response.data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-10">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker Home</h1>

      {loading ? (
        <p>Loading expenses...</p>
      ) : expenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map((expense) => (
            <div key={expense._id} className="card bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-1">{expense.title}</h2>
              <p className="text-gray-600 mb-1">Amount: ₹{expense.amount}</p>
              <p className="text-gray-600 mb-1">Category: {expense.category}</p>
              <p className="text-gray-500 text-sm">Date: {new Date(expense.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
}

export default Home;
