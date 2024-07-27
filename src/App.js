import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* The `element` prop takes a React element */}
          <Route path="/" element={<Transactions />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
