import { useEffect, useState } from "react";
import { getAddresses, deleteAddress } from "../../api";
import "./index.css";

export default function AddressList({ customerId, onEdit }) {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    const res = await getAddresses(customerId);
    setAddresses(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this address?")) {
      await deleteAddress(id);
      fetchAddresses();
    }
  };

  useEffect(() => {
    if (customerId) fetchAddresses();
  }, [customerId]);

  return (
    <div className="address-list">
      <h3>Addresses</h3>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Pin Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr) => (
              <tr key={addr.id}>
                <td>{addr.address_details}</td>
                <td>{addr.city}</td>
                <td>{addr.state}</td>
                <td>{addr.pin_code}</td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(addr)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(addr.id)}
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
}
