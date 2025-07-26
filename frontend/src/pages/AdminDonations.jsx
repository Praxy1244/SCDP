import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editDonation, setEditDonation] = useState(null);
const [deleteId, setDeleteId] = useState(null);


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    axios.get("http://localhost:5000/api/donations")
      .then(res => setDonations(res.data))
      .catch(err => console.error(err));
  };

  // Filtering logic
  const filteredDonations = donations.filter(donation => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.item.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDonations.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredDonations.length / recordsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
const openEditModal = (donation) => setEditDonation(donation);
const closeEditModal = () => setEditDonation(null);

const openDeleteModal = (id) => setDeleteId(id);
const closeDeleteModal = () => setDeleteId(null);

const handleUpdate = async () => {
  await axios.put(`http://localhost:5000/api/donation/${editDonation._id}`, editDonation);
  fetchDonations();
  closeEditModal();
};

const handleDelete = async () => {
  await axios.delete(`http://localhost:5000/api/donation/${deleteId}`);
  fetchDonations();
  closeDeleteModal();
};

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Admin - All Donations</h2>

      {/* Search & Filter */}
      <div className="row mt-3 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by donor, city, or item..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Donation Cards */}
      <div className="row">
        {currentRecords.length > 0 ? (
          currentRecords.map((donation) => (
            <div key={donation._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{donation.item}</h5>
                  <p><strong>Donor:</strong> {donation.donorName}</p>
                  <p><strong>City:</strong> {donation.city}</p>
                  <p><strong>Status:</strong> {donation.status}</p>
                  <p><strong>NGO:</strong> {donation.matchedNGO?.name || "Not matched"}</p>
                </div>
                <div className="d-flex justify-content-between">
  <button className="btn btn-sm btn-warning" onClick={() => openEditModal(donation)}>Edit</button>
  <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(donation._id)}>Delete</button>
</div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3 text-muted">No donations found.</p>
        )}
      </div>

{editDonation && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Donation</h5>
          <button type="button" className="btn-close" onClick={closeEditModal}></button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="form-control mb-2"
            value={editDonation.item}
            onChange={(e) => setEditDonation({ ...editDonation, item: e.target.value })}
          />
          <select
            className="form-select"
            value={editDonation.status}
            onChange={(e) => setEditDonation({ ...editDonation, status: e.target.value })}
          >
            <option>Submitted</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
)}
{deleteId && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Deletion</h5>
          <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this donation?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button className="btn btn-outline-primary me-2" onClick={goToPrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="btn btn-outline-primary ms-2" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
