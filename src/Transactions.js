import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px' }}>
      <h1>Transaction Assignment</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
            <tr key={transaction._id} style={{ borderBottom: '1px solid #ddd' }}>
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
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
        onClick={() => navigate('/add-transaction')}
      >
        + Add Transaction
      </button>
    </div>
  );
};

export default Transactions;
