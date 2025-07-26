import { useEffect, useState } from "react";
import axios from "axios";

export default function NgoManagement() {
  const [ngos, setNgos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newNgo, setNewNgo] = useState({ name: "", city: "", contact: "" });
const [showAddModal, setShowAddModal] = useState(false);

  const recordsPerPage = 5;

  const [editNgo, setEditNgo] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/ngos`)
      .then(res => setNgos(res.data))
      .catch(err => console.error(err));
  };

  // Filtering
  const filteredNgos = ngos.filter(ngo =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredNgos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNgos.length / recordsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Modal Handlers
  const openEditModal = (ngo) => setEditNgo(ngo);
  const closeEditModal = () => setEditNgo(null);

  const openDeleteModal = (id) => setDeleteId(id);
  const closeDeleteModal = () => setDeleteId(null);

  const handleUpdate = async () => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/ngos/${editNgo._id}`, editNgo);
    fetchNgos();
    closeEditModal();
  };

  const handleDelete = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/ngos/${deleteId}`);
    fetchNgos();
    closeDeleteModal();
  };
  
  const handleAddNgo = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/ngos`, newNgo);
    fetchNgos(); // refresh the list
    setShowAddModal(false);
    setNewNgo({ name: "", city: "", contact: "" }); // reset form
  } catch (error) {
    console.error("Failed to add NGO:", error);
  }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">Admin - NGO Management</h2>

      <div className="text-center mb-3">
  <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
    + Add NGO
  </button>
</div>


      {/* Search Input */}
      <div className="row mt-3 mb-3">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            placeholder="Search NGO by name, city, or contact..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* NGO Cards */}
      <div className="row">
        {currentRecords.length > 0 ? (
          currentRecords.map((ngo) => (
            <div key={ngo._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{ngo.name}</h5>
                  <p><strong>City:</strong> {ngo.city}</p>
                  <p><strong>Contact:</strong> {ngo.contact}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-warning" onClick={() => openEditModal(ngo)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(ngo._id)}>Delete</button>
                </div>
              </div>

              {/* Edit Modal */}
              {editNgo && editNgo._id === ngo._id && (
                <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Edit NGO</h5>
                        <button type="button" className="btn-close" onClick={closeEditModal}></button>
                      </div>
                      <div className="modal-body">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Name"
                          value={editNgo.name}
                          onChange={(e) => setEditNgo({ ...editNgo, name: e.target.value })}
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="City"
                          value={editNgo.city}
                          onChange={(e) => setEditNgo({ ...editNgo, city: e.target.value })}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact"
                          value={editNgo.contact}
                          onChange={(e) => setEditNgo({ ...editNgo, contact: e.target.value })}
                        />
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Modal */}
              {deleteId === ngo._id && (
                <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete this NGO?</p>
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showAddModal && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New NGO</h5>
          <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            value={newNgo.name}
            onChange={(e) => setNewNgo({ ...newNgo, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="City"
            value={newNgo.city}
            onChange={(e) => setNewNgo({ ...newNgo, city: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Contact"
            value={newNgo.contact}
            onChange={(e) => setNewNgo({ ...newNgo, contact: e.target.value })}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAddNgo}>Add NGO</button>
        </div>
      </div>
    </div>
  </div>
)}

            </div>
          ))
        ) : (
          <p className="text-center mt-3 text-muted">No NGOs found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button className="btn btn-outline-success me-2" onClick={goToPrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="btn btn-outline-success ms-2" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
