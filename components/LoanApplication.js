import React, { useState } from 'react';

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    loanDuration: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.email.includes("@")) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (isNaN(formData.loanAmount) || formData.loanAmount <= 0) {
      errors.loanAmount = "Loan amount must be a positive number";
      isValid = false;
    }

    if (isNaN(formData.loanDuration) || formData.loanDuration <= 0) {
      errors.loanDuration = "Loan duration must be a positive number";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error messages as user corrects them
    if (!!errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert('Loan Application Submitted');
      console.log(formData);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading/process time
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
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
          {errors.loanAmount && <p style={{ color: 'red' }}>{errors.loanAmount}</p>}
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
          {errors.loanDuration && <p style={{ color: 'red' }}>{errors.loanDuration}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default LoanApplication;