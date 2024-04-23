import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './views.css';
export function Billsandinvoice() {
  const [bookings, setBookings] = useState([]);
  const [selectedOption, setSelectedOption] = useState("selectvalue"); // Set initial dropdown value to "selectvalue"
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userid");
  const [feedbackBooking, setFeedbackBooking] = useState({}); // State to store the booking details for feedback
  useEffect(() => {
    if (selectedOption === "my") {
      fetchMyBookings();
    } else if (selectedOption === "all") {
      fetchAllBookings();
    }
  }, [selectedOption]);


  const handlebill = (booking) => {

    navigate('/GenerateBillPage', {state: {booking}});
  };


  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleinvoice = async (booking) => {
   navigate('/GenerateInvoicePage',{state: {booking}})
  };



  const fetchMyBookings = async () => {
    try {
     
      if (!userId) return;

      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/user/${userId}`;
      const response = await axios.get(apiUrl);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchAllBookings = async () => {


    const apiUrl1 = `http://localhost:8181/api/hotel-staff/user/${userId}`;
    const response1 = await axios.get(apiUrl1);
if(response1.data.role_id==1)
{

    try {
      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/all`;
      const response = await axios.get(apiUrl);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching all bookings:', error);
    }
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
        { booking.user.role_id === 1? (
          <>
           <button onClick={() => handlebill(booking)}>Generatebill</button>
            <button onClick={() => handleinvoice(booking)}>Generateinvoice</button>
          </>
        ) : (
            <button onClick={() => handleinvoice(booking)}>Generateinvoice</button>
        )}
      </td>
            </tr>
          ))}
        </tbody>
      </table>

  </div>
  );
}

export default Billsandinvoice;