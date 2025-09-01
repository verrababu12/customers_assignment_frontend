import { useState, useEffect } from "react";
import { createCustomer, getCustomerById, updateCustomer } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

export default function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (id) {
      getCustomerById(id).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCustomer(id, form);
    } else {
      await createCustomer(form);
    }
    navigate("/");
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h2>{id ? "Edit Customer" : "New Customer"}</h2>
      <input
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
}
