// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddTransaction = () => {
//   const [type, setType] = useState('Credit');
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!amount || !description || parseFloat(amount) <= 0) {
//       setError("Amount must be a positive number and description are required fields.");
//       return;
//     }

//     setLoading(true);
//     axios.post('http://localhost:5000/api/transactions', { type, amount: parseFloat(amount), description })
//       .then(() => {
//         setLoading(false);
//         navigate('/');
//       })
//       .catch(error => {
//         setLoading(false);
//         setError('Failed to add transaction. Please try again.');
//         console.error(error);
//       });
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
//       <h2>New Transaction</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Transaction Type:</label>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//           >
//             <option value="Credit">Credit</option>
//             <option value="Debit">Debit</option>
//           </select>
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Amount:</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//             min="0.01"
//             step="0.01"
//             style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Description:</label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             padding: '10px 15px',
//             cursor: 'pointer',
//             marginRight: '10px',
//             borderRadius: '5px'
//           }}
//         >
//           {loading ? 'Saving...' : 'Save'}
//         </button>
//         <button
//           type="button"
//           style={{
//             backgroundColor: '#6c757d',
//             color: '#fff',
//             border: 'none',
//             padding: '10px 15px',
//             cursor: 'pointer',
//             borderRadius: '5px'
//           }}
//           onClick={() => navigate('/')}
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTransaction;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const [type, setType] = useState('Credit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback URL

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || parseFloat(amount) <= 0) {
      setError("Amount must be a positive number and description are required fields.");
      return;
    }

    setLoading(true);
    axios.post(`${apiUrl}/api/transactions`, { type, amount: parseFloat(amount), description })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          // Request made and server responded
          setError(`Error: ${error.response.data.message || 'Something went wrong!'}`);
        } else if (error.request) {
          // Request made but no response received
          setError('Network error. Please check your connection and try again.');
        } else {
          // Something else caused the error
          setError('An unexpected error occurred.');
        }
        console.error(error);
      });
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setError(''); // Clear error message on input change
  };

  console.log('API URL:', apiUrl); // Check the API URL in the console

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Transaction Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleChange(setAmount)}
            required
            min="0.01"
            step="0.01"
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleChange(setDescription)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            marginRight: '10px',
            borderRadius: '5px'
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          style={{
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;

