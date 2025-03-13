import axios from 'axios';
require('dotenv').config();

const BASE_URL = process.env.API_URL;

const apiRequest = async (method, path, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const clients = {
  async getAll() {
    return await apiRequest('get', '/clients');
  },
  async getById(id) {
    return await apiRequest('get', `/clients/${id}`);
  },
  async add(clientData) {
    return await apiRequest('post', '/clients', clientData);
  },
  async update(id, clientData) {
    return await apiRequest('put', `/clients/${id}`, clientData);
  },
  async remove(id) {
    return await apiRequest('delete', `/clients/${id}`);
  }
};

export const loans = {
  async getAll() {
    return await apiRequest('get', '/loans');
  },
  async getById(id) {
    return await apiRequest('get', `/loans/${id}`);
  },
  async create(loanData) {
    return await apiRequest('post', '/loans', loanData);
  },
  async update(id, loanData) {
    return await apiRequest('put', `/loans/${id}`, loanData);
  },
  async remove(id) {
    return await apiRequest('delete', `/loans/${id}`);
  }
};

export const repayments = {
  async getAllByLoanId(loanId) {
    return await apiRequest('get', `/loans/${loanId}/repayments`);
  },
  async add(loanId, repaymentData) {
    return await apiRequest('post', `/loans/${loanId}/repayments`, repaymentData);
  }
};