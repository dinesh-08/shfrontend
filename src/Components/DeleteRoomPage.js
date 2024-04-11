import React, { useState } from "react";
import './DeleteRoomPage.css';
function DeleteRoomPage() {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8181/api/hotel-staff/delete-room/${roomId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setSuccessMessage(`Room with ID ${roomId} deleted successfully`);
        setRoomId('');
      } else {
        const data = await response.json();
        setError(data.message || `Failed to delete room with ID ${roomId}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('The room with the provided ID was not found');
    }
  };

  const handleInputChange = (e) => {
    setRoomId(e.target.value);
  };

  return (
    <div className="centered-content">
      <h2 style={{ textAlign: "center" }}>Delete Room</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-box">
            <label htmlFor="roomId">Room ID </label>
            <input
              id="roomId"
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Delete Room</button>
        </form>
      </div>
      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
}

export default DeleteRoomPage;