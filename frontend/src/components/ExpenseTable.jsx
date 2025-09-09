import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ExpenseTable = ({ expenses, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr className="text-gray-400">
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <tr key={expense._id} className="hover:bg-gray-700 transition-colors duration-200">
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.description}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td className="flex justify-end space-x-2">
                                    <button onClick={() => onEdit(expense)} className="btn btn-ghost btn-sm text-blue-400">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => onDelete(expense._id)} className="btn btn-ghost btn-sm text-red-400">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-500 py-4">No expenses found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;