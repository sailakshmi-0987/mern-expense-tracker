import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseFormModal = ({ expense, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (expense) {
            setFormData({
                description: expense.title,
                amount: expense.amount,
                category: expense.category,
                date: new Date(expense.date).toISOString().split('T')[0]
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };

        try {
            if (expense) {
                // Update expense
                await axios.put(`http://localhost:5000/api/expense/update/${expense._id}`, formData, config,{withCredentials:true});
            } else {
                // Create new expense
                await axios.post('http://localhost:5000/api/expense/create', formData, config,{withCredentials:true});
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to save expense.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-gray-800 shadow-xl p-6">
                <h3 className="font-bold text-xl mb-4">{expense ? 'Edit Expense' : 'Add New Expense'}</h3>
                {error && <div className="alert alert-error mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text ">Description</span></label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className="input input-bordered w-full text-black" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Amount</span></label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="input input-bordered w-full text-black" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Category</span></label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} className="input input-bordered w-full text-black" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Date</span></label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered w-full text-black" required />
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseFormModal;