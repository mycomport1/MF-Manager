import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

let loansCache = null;

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    if (loansCache) {
      setLoans(loansCache);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/loans`);
      loansCache = response.data;
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div>
      <h2>List of Loans</h2>
      {loans.length > 0 ? (
        <ul>
          {loans.map((loan) => (
            <li key={loan.id}>
              {loan.name} - Amount: {loan.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No loans available.</p>
      )}
    </div>
  );
};

export default LoanList;