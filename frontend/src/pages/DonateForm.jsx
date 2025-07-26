import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DonateForm() {
  const [formData, setFormData] = useState({ donorName: "", city: "", item: "", condition: "New" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.donorName || !formData.city || !formData.item || !formData.condition) {
    toast.error("Please fill all fields.");
    return;
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/donation`, formData);
    if (res.data.matchedNGO?.name) {
      toast.success(`Donation submitted! NGO matched: ${res.data.matchedNGO.name}`);
    } else {
      toast.info(`Donation submitted, but no NGO found for ${formData.city}`);
    }
  } catch (error) {
    toast.error("Error submitting donation.");
  }
};

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center text-primary">Donate Clothes</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" name="donorName" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Item</label>
            <input type="text" className="form-control" name="item" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Condition</label>
            <select className="form-select" name="condition" onChange={handleChange}>
              <option>New</option>
              <option>Gently Used</option>
              <option>Worn</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit Donation</button>
        </form>
      </div>
    </div>
  );
}
