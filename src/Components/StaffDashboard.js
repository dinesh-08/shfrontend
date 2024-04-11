import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css'; // Assuming you have a sidebar.css file for CSS

// Function to render NavLinks
const StaffDashboard = () => {
  return (
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
        <li className="sidebar-item large-link-box">
          <NavLink className="sidebar-link large-link-box" to="/addStaff">Add Staff</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default StaffDashboard;