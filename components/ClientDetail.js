import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDetails = ({ clientId }) => {
  const [clientDetails, setClientDetails] = useState(null);
  const [loans, setLoans] = useState([]);

  const fetchClientDetailsAndLoans = async () => {
    try {
      const clientDetailsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${clientId}`);
      setClientDetails(clientDetailsResponse.data);

      const loansResponse = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${clientId}/loans`);
      setLoans(loansResponse.data);
    } catch (error) {
      console.error('There was an error fetching the client details or loans:', error);
    }
  };

  useEffect(() => {
    fetchClientDetailsAndLoans();
  }, [clientId]);

  if (!clientDetails) {
    return <p>Loading client details...</p>;
  } else {
    return (
      <div>
        <h2>Client Details</h2>
        <p><strong>Name:</strong> {clientDetails.name}</p>
        <p><strong>Email:</strong> {clientDetails.email}</p>
        <p><strong>Phone:</strong> {clientDetails.phone}</p>
        
        <h3>Loans</h3>
        <ul>
          {loans.length > 0 ? (
            loans.map(loan => (
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