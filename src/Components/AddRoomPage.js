import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddRoompage.css";
import { useNavigate,NavLink } from 'react-router-dom';


export function AddRoomPage() {
  const [roomDetails, setRoomDetails] = useState({
    type: "",
    roomNo: "", // Added roomNo field
    capacity: '',
    room_id:10,
    price: '' // Added price key to roomDetails state
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const [firstName,setFirstName]=useState(sessionStorage.getItem('firstName'))
 useEffect(()=>{
  if(!firstName)
     navigate('/login')
 },[firstName])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomDetails.capacity || !roomDetails.price) {
      setError('Capacity and Price are required.');
      return;
    }
    try {
      const payload = { ...roomDetails, room_id: roomDetails.room_id - 10, capacity: parseInt(roomDetails.capacity), price: parseFloat(roomDetails.price) };
      const response = await axios.post("http://localhost:8181/api/hotel-staff/add-room", payload);
      if (response.status === 200) {
        setSuccessMessage(response.data);
        setRoomDetails({
          type: "",
          roomNo: "", // Reset roomNo to '' after room is successfully added
          capacity: '',
          room_id:10,
          price: '' // Reset price to '' after room is successfully added
        });
      } else {
        setError(response.data || "Failed to add room");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="add-room-page" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <nav className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/addRoomPage">Add Room</NavLink>
          </li>
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/deleteRoomPage">Delete Room</NavLink>
          </li>
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/updateRoomPage">Update Room</NavLink>
          </li>
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/viewRoomsPage">View Rooms</NavLink>
          </li>
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/walkInReservationPage">Walk In Reservation</NavLink>
          </li>
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/generateBillPage">Generate Bill</NavLink>
          </li>
          <li className="sidebar-item large-link-box">
            <NavLink className="sidebar-link large-link-box" to="/generateInvoicePage">Generate Invoice</NavLink>
          </li>
        </ul>
      </nav>
      <h2 className="page-title" style={{textAlign: "center", marginTop: "0"}}>Add Room</h2>
      <div className="add-room-container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
        <div className="form-container" style={{ width: "50%" }}>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="add-room-form" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div className="form-group" style={{ margin: "10px" }}>
              <label htmlFor="type" className="form-label">Room Type </label>
              <select
                id="type"
                name="type"
                value={roomDetails.type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Room Type</option>
                <option value="King">King</option>
                <option value="Queen">Queen</option>
                <option value="Suite-King">Suite-King</option>
                <option value="Suite-Queen">Suite-Queen</option>
              </select>
            </div>
            <div className="form-group" style={{ margin: "10px" }}>
              <label htmlFor="roomNo" className="form-label">Room Number </label>
              <input
                id="roomNo"
                name="roomNo"
                value={roomDetails.roomNo}
                onChange={handleChange}
                className="form-select"
                required
              />
            </div>
            <div className="form-group" style={{ margin: "10px" }}>
              <label htmlFor="capacity" className="form-label">Capacity </label>
              <select
                id="capacity"
                name="capacity"
                value={roomDetails.capacity}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Capacity</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="form-group" style={{ margin: "10px" }}>
              <label htmlFor="price" className="form-label">Price </label>
              <select
                id="price"
                name="price"
                value={roomDetails.price}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Price</option>
                <option value="100.00">100.00</option>
                <option value="120.00">120.00</option>
                <option value="130.00">130.00</option>
                <option value="140.00">140.00</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Add Room</button>
          </form>
        </div>
      </div>
      {successMessage && <div className="success-message" style={{ alignSelf: "center", marginTop: "20px" }}>{successMessage}</div>}
    </div>
  );


}

export default AddRoomPage;