import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDetails = ({ clientId }) => {
  const [details, setDetails] = useState(null);
  const [clientLoans, setClientLoans] = useState([]);

  const fetchDetailsAndLoans = async () => {
    try {
      const detailsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${clientId}`);
      setDetails(detailsResponse.data);

      const loansResponse = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${clientId}/loans`);
      setClientLoans(loansResponse.data);
    } catch (error) {
      console.error('There was an error fetching the client details or loans:', error);
    }
  };

  useEffect(() => {
    fetchDetailsAndLoans();
  }, [clientId]);

  if (!details) {
    return <p>Loading client details...</p>;
  } else {
    return (
      <div>
        <h2>Client Details</h2>
        <p><strong>Name:</strong> {details.name}</p>
        <p><strong>Email:</strong> {details.email}</p>
        <p><strong>Phone:</strong> {details.phone}</p>
        
        <h3>Loans</h3>
        <ul>
          {clientLoans.length > 0 ? (
            clientLoans.map(loan => (
              <li key={loan.id}>
                <p><strong>ID:</strong> {loan.id}</p>
                <p><strong>Amount:</strong> {loan.amount}</p>
                <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
                <p><strong>Status:</strong> {loan.status}</p>
              </li>
            ))
          ) : (
            <p>No loans found for this client.</p>
          )}
        </ul>
      </div>
    );
  }
};

export default ClientDetails;