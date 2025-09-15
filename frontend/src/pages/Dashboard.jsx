import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSignOutAlt, FaChartPie, FaList } from 'react-icons/fa';
import ExpenseFormModal from '../components/ExpenseFormModal';
import ExpenseTable from '../components/ExpenseTable';
import SummaryCards from '../components/SummaryCards';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const navigate = useNavigate();

    // Use useCallback to memoize the fetchExpenses function
    const fetchExpenses = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/expense/fetch', {
                withCredentials: true,
            });
            
            if (Array.isArray(res.data)) {
                setExpenses(res.data);
            } else {
                setExpenses([]);
            }
            setLoading(false);
        } catch (err) {
            console.error("API call failed:", err.response ? err.response.data : err.message);
            
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError('Session expired. Please log in again.');
                navigate('/login');
            } else {
                setError('Failed to fetch expenses.');
            }
            setLoading(false);
        }
    }, [navigate]);

    // useEffect now depends on fetchExpenses, which won't change on every render
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchExpenses();
    }, [fetchExpenses, navigate]); // Add navigate here as well to satisfy the useCallback dependency

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Use useCallback on other functions that call fetchExpenses
    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await axios.delete(`http://localhost:5000/api/expense/delete/${id}`, { withCredentials: true });
                fetchExpenses();
            } catch (err) {
                console.error(err);
                setError('Failed to delete expense.');
            }
        }
    }, [fetchExpenses]);

    const handleAddOrUpdate = useCallback(() => {
        fetchExpenses();
        setIsModalOpen(false);
        setEditingExpense(null);
    }, [fetchExpenses]);
    
    // The safeguard is still crucial
    const totalExpenses = (expenses || []).reduce((acc, expense) => acc + expense.amount, 0);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-error">{error}</div>;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="lg:w-64 bg-gray-800 text-white p-6 shadow-lg lg:fixed lg:h-screen transition-all duration-300">
                <div className="text-2xl font-bold mb-8 text-center text-blue-400">
                    <FaChartPie className="inline-block mr-2" />
                    Tracker
                </div>
                <ul className="menu bg-gray-800 rounded-box p-2 w-full text-base">
                    <li><a className="hover:bg-gray-700 rounded-md py-2 px-4"><FaList className="mr-2" /> Expenses</a></li>
                    <li className="mt-auto">
                        <a onClick={handleLogout} className="hover:bg-red-700 rounded-md py-2 px-4 text-red-400">
                            <FaSignOutAlt className="mr-2" /> Logout
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-6 overflow-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <button onClick={() => { setEditingExpense(null); setIsModalOpen(true); }} className="btn btn-primary btn-sm md:btn-md transition-transform transform hover:scale-105">
                        <FaPlus className="mr-2" /> Add Expense
                    </button>
                </header>

                <SummaryCards totalExpenses={totalExpenses} />

                <div className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Recent Expenses</h2>
                    <ExpenseTable 
                        expenses={expenses} 
                        onDelete={handleDelete} 
                        onEdit={(expense) => {
                            setEditingExpense(expense);
                            setIsModalOpen(true);
                        }} 
                    />
                </div>
            </div>

            {/* Expense Form Modal */}
            {isModalOpen && (
                <ExpenseFormModal 
                    expense={editingExpense} 
                    onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} 
                    onSuccess={handleAddOrUpdate} 
                />
            )}
        </div>
    );
};

export default Dashboard;