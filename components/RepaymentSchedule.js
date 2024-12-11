import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const LoanRepaymentSchedule = () => {
  const [repayments, setRepayments] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get(`${API_URL}/repayments`)
      .then(response => {
        setRepayments(response.data);
      })
      .catch(error => {
        setError('Failed to load data');
        console.error(error);
      });
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div>
      <h2>Loan Repayment Schedule</h2>
      {error && <p>{error}</p>}
      <ul>
        {repayments.map((repayment) => {
          const isPast = new Date(repayment.dueDate) < new Date();
          return (
            <li key={repayment.id} style={{ color: isPast ? 'grey' : 'black' }}>
              {`${formatDate(repayment.dueDate)}: $${repayment.amount} - ${isPast ? 'Paid' : 'Upcoming'}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default LoanRepaymentSchedule;