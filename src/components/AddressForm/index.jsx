import { useState, useEffect } from "react";
import { addAddress, updateAddress } from "../../api";
import "./index.css";

export default function AddressForm({
  customerId,
  editingAddress,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  useEffect(() => {
    if (editingAddress) {
      setForm({
        address_details: editingAddress.address_details,
        city: editingAddress.city,
        state: editingAddress.state,
        pin_code: editingAddress.pin_code,
      });
    } else {
      setForm({ address_details: "", city: "", state: "", pin_code: "" });
    }
  }, [editingAddress]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingAddress) {
      await updateAddress(editingAddress.id, form);
    } else {
      await addAddress(customerId, form);
    }
    onSuccess();
    setForm({ address_details: "", city: "", state: "", pin_code: "" });
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h3>{editingAddress ? "Edit Address" : "Add Address"}</h3>
      <input
        type="text"
        name="address_details"
        placeholder="Address Details"
        value={form.address_details}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pin_code"
        placeholder="Pin Code"
        value={form.pin_code}
        onChange={handleChange}
        required
      />
      <div className="actions">
        <button type="submit" className="btn-save">
          {editingAddress ? "Update" : "Save"}
        </button>
        {editingAddress && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
