import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanDetailsComponent = ({ loanId }) => {
  const [loanDetails, setLoanDetails] = useState(null);
  const [repaymentHistory, setRepaymentHistory] = useState([]);

  const fetchLoanDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/loans/${loanId}`);
      setLoanDetails(response.data);
    } catch (error) {
      console.error('Error fetching loan details', error);
    }
  };

  const fetchRepaymentHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/loans/${loanId}/repayments`);
      setRepaymentHistory(response.data);
    } catch (error) {
      console.error('Error fetching repayment history', error);
    }
  };

  useEffect(() => {
    fetchLoanDetails();
    fetchRepaymentHistory();
  }, [loanId]);

  return (
    <div>
      {loanDetails && (
        <div>
          <h2>Loan Details</h2>
          <p>Loan ID: {loanDetails.id}</p>
          <p>Amount: ${loanDetails.amount}</p>
          <p>Term: {loanDetails.term} months</p>
          <p>Rate: {loanDetails.rate}%</p>
          <p>Status: {loanDetails.status}</p>
        </div>
      )}
      {repaymentHistory.length > 0 && (
        <div>
          <h3>Repayment History</h3>
          <ul>
            {repaymentHistory.map((payment, index) => (
              <li key={index}>
                Date: {payment.date}, Amount: ${payment.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoanDetailsComponent;