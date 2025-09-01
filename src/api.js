import axios from "axios";

const API = axios.create({
  baseURL: "https://customers-assignment-backend-1.onrender.com/api",
});

// Customers
export const getCustomers = (params) => API.get("/customers", { params });
export const getCustomerById = (id) => API.get(`/customers/${id}`);
export const createCustomer = (data) => API.post("/customers/create-customer", data);
export const updateCustomer = (id, data) => API.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

// Addresses
export const getAddresses = (customerId) =>
  API.get(`/customers/${customerId}/addresses`);
export const addAddress = (customerId, data) =>
  API.post(`/customers/${customerId}/addresses`, data);
export const updateAddress = (addressId, data) =>
  API.put(`/addresses/${addressId}`, data);
export const deleteAddress = (addressId) =>
  API.delete(`/addresses/${addressId}`);
