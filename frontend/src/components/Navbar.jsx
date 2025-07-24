import { Link } from "react-router-dom";

export default function Navbar() {
  return (
   <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">SCDP</Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/donate">Donate</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/ngos">NGOs</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/admin/donations">Admin</Link></li>
        <li className="nav-item">
  <Link className="nav-link" to="/admin/ngos">NGO Management</Link>
</li>
        <li className="nav-item">
  <Link className="nav-link" to="/admin/stats">Analytics</Link>
</li>

      </ul>
    </div>
  </div>
</nav>

  );
}
