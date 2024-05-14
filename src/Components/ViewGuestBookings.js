import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './views.css';
import Modalbox from './Modalbox';

export function Viewbookings() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedbackBooking, setFeedbackBooking] = useState({});
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const[booking_id,setBooking_id]=useState(0);
  const[feedbackBookingIds,setFeedbackBookingIds]=useState([]);
  const[feedbackResponse,setFeedbackResponse]=useState([]);
  const [formData, setFormData] = useState({
    type:'r',
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();
  const [bookingIds, setBookingIds] = useState([]);

  useEffect(() => {
    fetchFeedbackList();
    fetchAllBookings();
  }, []);

  const handleFeedback = (booking) => {
    setFeedbackBooking(booking);
    navigate('/feedbackform', { state: { booking } });
  };

  const handleViewFeedBack = (booking) => {
    const fb = feedbackResponse?.filter((item) => item?.booking?.booking_id === booking?.booking_id)?.[0];
    console.log({booking, feedbackResponse, fb})
    setFeedbackBooking(booking);
    navigate('/feedbackform', { state: { feedback: fb } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancel = async (booking) => {
    try {
      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/delete/${booking.booking_id}`;
      await axios.put(apiUrl, { isdeleted: true });
      fetchAllBookings();
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const fetchMyBookings = async () => {
    // This function is retained but not used
    try {
      const userId = sessionStorage.getItem("userid");
      if (!userId) return;

      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/user/${userId}`;
      const response = await axios.get(apiUrl);
      setBookings(response.data);
      setBookingIds(response.data.map(booking => booking.booking_id));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchFeedbackList = async () => {
    try{
    const apiUrl = `http://localhost:8181/api/hotel-staff/feedbacklist/all`;
    const feedbackResponse = await axios.get(apiUrl);
    setFeedbackResponse(feedbackResponse.data)
    const feedbackBookingIds = feedbackResponse.data.map(feedback => feedback.booking.booking_id);
    setFeedbackBookingIds(prevBookingIds => [...prevBookingIds, ...feedbackBookingIds]);
    console.log("fjfj",feedbackBookingIds)

   } catch (error) {
    console.error('Error fetching bookings:', error);
  }

  };

  const fetchAllBookings = async () => {
    try {
        const userId = sessionStorage.getItem("userid");
        if (!userId) return;
  
        const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/user/${userId}`;
        const response = await axios.get(apiUrl);
        setBookings(response.data);
        setBookingIds(response.data.map(booking => booking.booking_id));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
  };

  

  const handleUpdate = (booking) => {
    setBooking_id(booking.booking_id);
    setShowModal(true);
  };

  const handleModalSubmit = (booking_id, formData) => {
    formData.booking_id = booking_id;
    setFormData(formData);
    console.log("Form data:", formData);

    axios.post(`http://localhost:8181/api/hotel-staff/bookingDetails`, formData)
      .then(response => {
        console.log("Submitted successfully:", response.data);
        handleCloseModal();
        alert('succesfully updated')
        fetchAllBookings();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div>
     {showModal && <Modalbox onClose={handleCloseModal} onSubmit={formData => handleModalSubmit(booking_id, formData)} />}
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
              <td>{booking.user.role_id === 1 ? booking.members[0].firstName : booking.user.firstName}</td>
              <td>
                {!booking.isdeleted ? (
                  <>
                    <button onClick={() => handleUpdate(booking)}>Update</button>
                    <button onClick={() => handleCancel(booking)}>Cancel</button>
                  </>
                ) : (
                  feedbackBookingIds.includes(booking.booking_id)?
                    <button onClick={() => handleViewFeedBack(booking)}>ViewFeedBack</button>:
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