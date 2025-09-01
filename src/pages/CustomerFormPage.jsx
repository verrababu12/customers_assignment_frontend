import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, createCustomer, updateCustomer } from "../api";
import "./CustomerFormPage.css";

const CustomerFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch customer data if editing
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (id) {
          const { data } = await getCustomerById(id);
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            phone_number: data.phone_number || "",
          });
        }
      } catch (err) {
        console.error("Error loading customer:", err);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateCustomer(id, formData);
      } else {
        await createCustomer(formData);
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving customer:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-form-page">
      <h1>{id ? "Edit Customer" : "Add New Customer"}</h1>
      <form className="customer-form" onSubmit={handleSubmit}>
        <label>
          FirstName:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          LastName:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CustomerFormPage;
