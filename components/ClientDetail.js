import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDetails = ({ clientId }) => {
  const [details, setDetails] = useState(null);
  const [clientLoans, setClientLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetailsAndLoans = async () => {
    setLoading(true);
    try {
      const detailsUrl = `${process.env.REACT_APP_API_URL}/clients/${clientId}`;
      const loansUrl = `${process.env.REACT_APP_API_URL}/clients/${clientId}/loans`;
      const [detailsResponse, loansResponse] = await Promise.all([
        axios.get(detailsUrl),
        axios.get(loansUrl),
      ]);

      setDetails(detailsResponse.data);
      setClientLoans(loansResponse.data);
    } catch (error) {
      console.error('There was an error fetching the client details or loans:', error);
      setError('Failed to fetch client details or loans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsAndLoans();
  }, [clientId]);

  if (loading) {
    return <p>Loading client details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              <p><strong>Amount:</strong> ${loan.amount.toLocaleString()}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p><strong>Duration:</strong> {loan.duration} months</p>
              <p><strong>Status:</strong> {loan.status}</p>
              {loan.remarks && <p><strong>Remarks:</strong> {loan.remarks}</p>}
            </li>
          ))
        ) : (
          <p>No loans found for this client.</p>
        )}
      </ul>
    </div>
  );
};

export default ClientDetails;