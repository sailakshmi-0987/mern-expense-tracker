import React from 'react';
import { FaMoneyBillWave, FaCalendarAlt, FaPiggyBank } from 'react-icons/fa';

const SummaryCards = ({ totalExpenses }) => {
    // You can add more complex logic here for monthly expenses, etc.
    const monthlyExpenses = totalExpenses; 
    const remainingBudget = 1500 - totalExpenses; // Example fixed budget

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="card bg-gray-800 shadow-xl p-6 transition-transform transform hover:scale-105 duration-300">
                <div className="flex items-center">
                    <FaMoneyBillWave className="text-blue-400 text-3xl mr-4" />
                    <div>
                        <div className="text-sm text-gray-400">Total Expenses</div>
                        <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className="card bg-gray-800 shadow-xl p-6 transition-transform transform hover:scale-105 duration-300">
                <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-400 text-3xl mr-4" />
                    <div>
                        <div className="text-sm text-gray-400">This Month</div>
                        <div className="text-2xl font-bold">${monthlyExpenses.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className="card bg-gray-800 shadow-xl p-6 transition-transform transform hover:scale-105 duration-300">
                <div className="flex items-center">
                    <FaPiggyBank className="text-blue-400 text-3xl mr-4" />
                    <div>
                        <div className="text-sm text-gray-400">Remaining Budget</div>
                        <div className="text-2xl font-bold text-green-400">${remainingBudget.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;