import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional for custom styling

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-success">Give Clothes, Spread Smiles!</h1>
      <p className="lead">Donate your clothes and make a difference.</p>

      <Link to="/donate" className="btn btn-primary btn-lg mt-3">
        Donate Now
      </Link>

      <div className="mt-5">
        <h3>Why Donate Clothes?</h3>
        <p>
          Your unused clothes can bring warmth and dignity to someone in need. Join our mission to promote sustainability and help society.
        </p>
      </div>

      <div className="mt-4">
        <Link to="/ngos" className="btn btn-outline-secondary me-2">
          Explore NGOs
        </Link>
        <Link to="/admin/stats" className="btn btn-outline-dark">
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
