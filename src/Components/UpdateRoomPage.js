import React, { useState } from 'react';
import './UpdateRoomPage.css';

function UpdateRoomPage() {
  const [roomId, setRoomId] = useState('');
  const [updatedRoom, setUpdatedRoom] = useState({
    type: '',
    capacity: 0,
    price: 0 // Added price to the room details
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    // Ensure numeric values for capacity and price
    const formattedValue = name === 'capacity' || name === 'price' ? parseInt(value, 10) : value;
    setUpdatedRoom(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Validation for Room Type, Capacity, and Price
    if (!updatedRoom.type || !updatedRoom.capacity || !updatedRoom.price) {
      setError('Room Type, Capacity, and Price are mandatory fields.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8181/api/hotel-staff/update-room/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRoom)
      });
      if (response.ok) {
        setSuccessMessage('Room updated successfully.');
        setUpdatedRoom({
          type: '',
          capacity: 0,
          price: 0 // Resetting price after successful update
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update room.');
        }
    } catch (error) {
      console.error('Error:', error);
      setError('The room with the provided ID was not found');
    }
  };

  return (
    <div className="update-room-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <h2 style={{ position: 'absolute', top: 0, width: '100%', textAlign: 'center', marginTop: '20px' }}>Update Room</h2>
      <div className="form-box" style={{ width: 'fit-content', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px', marginTop: '20px' }}>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="room-update-form" style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <label htmlFor="roomId">Room ID </label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            className="form-control"
            placeholder="Room ID"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
          />
          <label htmlFor="type">Room Type </label>
          <select
            id="type"
            name="type"
            className="form-control"
            value={updatedRoom.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="King">King</option>
            <option value="Queen">Queen</option>
            <option value="Suite-King">Suite-King</option>
            <option value="Suite-Queen">Suite-Queen</option>
          </select>
          <label htmlFor="capacity">Capacity </label>
          <select
            id="capacity"
            name="capacity"
            className="form-control"
            value={updatedRoom.capacity}
            onChange={handleChange}
            required
          >
            <option value="">Select Capacity</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="price">Price </label>
          <select
            id="price"
            name="price"
            className="form-control"
            value={updatedRoom.price}
            onChange={handleChange}
            required
          >
            <option value="">Select Price</option>
            <option value="100">100.00</option>
            <option value="120">120.00</option>
            <option value="130">130.00</option>
            <option value="140">140.00</option>
          </select>
          <button type="submit" className="update-button" style={{ gridColumn: 'span 2' }}>Update Room</button>
        </form>
        
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default UpdateRoomPage;