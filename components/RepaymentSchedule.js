import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const LoanRepaymentSchedule = () => {
  const [repayments, setRepayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

  useEffect(() => {
    fetchRepayments();
  }, []);

  const fetchRepayments = () => {
    setLoading(true);
    setError(null);
    axios.get(`${API_URL}/repayments`)
      .then(response => {
        setRepayments(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load data');
        setLoading(false);
        console.error(error);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRepayments = repayments.filter(repayment => {
    const isPast = new Date(repayment.dueDate) < new Date();
    return filter === 'all' || (filter === 'upcoming' && !isPast) || (filter === 'past' && isPast);
  });

  return (
    <div>
      <h2>Loan Repayment Schedule</h2>
      {error && <div><p>{error}</p> <button onClick={fetchRepayments}>Retry</button></div>}
      {loading ? <p>Loading...</p> : 
        <>
          <div>
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('upcoming')}>Upcoming</button>
            <button onClick={() => setFilter('past')}>Past</button>
          </div>
          <ul>
            {filteredRepayments.map((repayment) => {
              const isPast = new Date(repayment.dueDate) < new Date();
              return (
                <li key={repayment.id} style={{ color: isPast ? 'grey' : 'black' }}>
                  {`${formatDate(repayment.dueDate)}: $${repayment.amount} - ${isPast ? 'Paid' : 'Upcoming'}`}
                </li>
              );
            })}
          </ul>
        </>
      }
    </div>
  );
};

export default LoanRepaymentSchedule;