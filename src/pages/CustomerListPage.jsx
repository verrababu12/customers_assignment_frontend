import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../api";
import "./CustomerListPage.css";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const first_name = customer?.first_name || "";
    const last_name = customer?.last_name || "";
    return (
      first_name.toLowerCase().includes(search.toLowerCase()) ||
      last_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="customer-list-page">
      <div className="header">
        <h1>Customers</h1>
        <h3>Click on a customer's first name to view their address details</h3>

        <Link to="/customers/new" className="btn btn-primary">
          + Add Customer
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <Link
                    to={`/customers/${customer.id}`}
                    className="customer-link"
                  >
                    {customer.first_name}
                  </Link>
                </td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>
                  <Link
                    to={`/customers/edit/${customer.id}`}
                    className="btn btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerListPage;
