import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanDetailsComponent = ({ loanId }) => {
  const [loanDetails, setLoanDetails] = useState(null);
  const [repaymentHistory, setRepaymentHistory] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/loans/${loanId}`
        );
        setLoanDetails(detailsResponse.data);

        const repaymentResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/loans/${loanId}/repayments`
        );
        setRepaymentHistory(repaymentResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setFetchError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [loanId]);

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
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