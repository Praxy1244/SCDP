// components/NgoList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function NgoList() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/ngos")
      .then((res) => setNgos(res.data))
      .catch((err) => console.error("Failed to fetch NGOs:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>NGO List</h2>
      <ul className="list-group">
        {ngos.map((ngo) => (
          <li key={ngo._id} className="list-group-item">
            <strong>{ngo.name}</strong> - {ngo.city} (Contact: {ngo.contact})
          </li>
        ))}
      </ul>
    </div>
  );
}
