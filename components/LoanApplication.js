import React, { useState } from 'react';

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    loanDuration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Loan Application Submitted');
    console.log(formData);
  };

  return (
    <div>
      <h2>Loan Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="loanAmount">Loan Amount:</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="loanDuration">Loan Duration (Months):</label>
          <input
            type="number"
            id="loanDuration"
            name="loanDuration"
            value={formData.loanDuration}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default LoanApplication;