import React, { useState } from 'react';

function Modalbox({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    startDate: '',
    roomType: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(formData); // Call the onSubmit function with the form data
  };

  return (
    <div style={{ background: 'beige', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,1,0,0.1)' }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startdate">Start Date:</label>
        <input type="date" id="startdate" name="startDate" value={formData.startDate} onChange={handleInputChange} />
        <label htmlFor="roomtype">Room Type:</label>
        <select id="roomtype" name="roomType" value={formData.roomType} onChange={handleInputChange}>
          <option value="">Select Room Type</option>
          <option value="king">King</option>
          <option value="queen">Queen</option>
        </select>
        <label htmlFor="enddate">End Date:</label>
        <input type="date" id="enddate" name="endDate" value={formData.endDate} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Modalbox;
