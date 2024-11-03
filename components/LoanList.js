import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_URL;

let cachedLoans = null;

const LoanListing = () => {
  const [loanList, setLoanList] = useState([]);

  const loadLoans = async () => {
    if (cachedLoans) {
      setLoanList(cachedLoans);
      return;
    }
    try {
      const { data: loansData } = await axios.get(`${API_ENDPOINT}/loans`);
      cachedLoans = loansData;
      setLoanList(loansData);
    } catch (error) {
      console.error("Error loading loans:", error);
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  return (
    <div>
      <h2>Loan Portfolio</h2>
      {loanList.length > 0 ? (
        <ul>
          {loanList.map((loan) => (
            <li key={loan.id}>
              {loan.name} - Amount: {loan.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No loans found.</p>
      )}
    </div>
  );
};

export default LoanListing;