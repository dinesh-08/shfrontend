import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './views.css';
export function Viewbookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedOption, setSelectedOption] = useState("selectvalue"); // Set initial dropdown value to "selectvalue"
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [feedbackBooking, setFeedbackBooking] = useState({}); // State to store the booking details for feedback
  useEffect(() => {
    if (selectedOption === "my") {
      fetchMyBookings();
    } else if (selectedOption === "all") {
      fetchAllBookings();
    }
  }, [selectedOption]);


  const handleFeedback = (booking) => {
    setFeedbackBooking(booking); // Store the booking details for feedback
    navigate('/feedbackform', {state: {booking}}); // Send booking details to feedback form
  };


  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleCancel = async (booking) => {
    try {
      // Instead of handling cancel, now making a PUT request to logically delete/update the status of the booking
      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/delete/${booking.booking_id}`;
      await axios.put(apiUrl, { isdeleted: true });
      console.log("Cancel booking:", booking.booking_id);
      // Assuming the endpoint response includes the updated bookings list
      fetchMyBookings(); // or fetchAllBookings() based on the selected option to refresh the list
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };



  const fetchMyBookings = async () => {
    try {
      const userId = sessionStorage.getItem("userid");
      if (!userId) return;

      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/user/${userId}`;
      const response = await axios.get(apiUrl);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/all`;
      const response = await axios.get(apiUrl);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching all bookings:', error);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === "my") {
      fetchMyBookings();
    } else if (selectedOption === "all") {
      fetchAllBookings();
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="selectvalue">select </option>
          <option value="my">My</option>
          <option value="all">All</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <h2>Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.room.roomNo}</td>
              <td>{booking.room.type}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>
  {booking.user.role_id === 1 ? booking.members[0].firstName : booking.user.firstName}
</td>
<td>
        {!booking.isdeleted ? (
          <>
            <button >Update</button>
            <button onClick={() => handleCancel(booking)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => handleFeedback(booking)}>Feedback</button>
        )}
      </td>
            </tr>
          ))}
        </tbody>
      </table>

  </div>
  );
}

export default Viewbookings;