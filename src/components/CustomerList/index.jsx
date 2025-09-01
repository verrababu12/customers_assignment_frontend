import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../../api";
import { Link } from "react-router-dom";
import "./index.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    const res = await getCustomers({ search });
    setCustomers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      await deleteCustomer(id);
      fetchCustomers();
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  return (
    <div className="customer-list">
      <div className="header">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link className="btn" to="/customers/new">
          + Add Customer
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>
                {c.first_name} {c.last_name}
              </td>
              <td>{c.phone_number}</td>
              <td>
                <Link to={`/customers/${c.id}`} className="btn-view">
                  View
                </Link>
                <Link to={`/customers/edit/${c.id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
