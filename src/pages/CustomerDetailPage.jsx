import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCustomerById } from "../api";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";
import "./CustomerDetailPage.css"

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchCustomer = async () => {
    const res = await getCustomerById(id);
    setCustomer(res.data);
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleSuccess = () => {
    setRefresh(!refresh);
    setEditingAddress(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {customer && (
        <>
          <h2>
            {customer.first_name} {customer.last_name}
          </h2>
          <p>Phone: {customer.phone_number}</p>
          <Link to="/" className="btn">
            Back to List
          </Link>

          <AddressForm
            customerId={id}
            editingAddress={editingAddress}
            onSuccess={handleSuccess}
            onCancel={() => setEditingAddress(null)}
          />

          <AddressList
            key={refresh}
            customerId={id}
            onEdit={(addr) => setEditingAddress(addr)}
          />
        </>
      )}
    </div>
  );
}
