import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));
  }, []);

  const calculateBalance = (transactions, index) => {
    let balance = 0;
    for (let i = transactions.length - 1; i >= index; i--) {
      const transaction = transactions[i];
      if (transaction.type === 'Credit') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }
    return balance;
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Transaction Assignment</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type === 'Credit' ? transaction.amount : ''}</td>
              <td>{transaction.type === 'Debit' ? transaction.amount : ''}</td>
              <td>{calculateBalance(transactions, index)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/add-transaction')}
      >
        + Add Transaction
      </button>
    </div>
  );
};

export default Transactions;