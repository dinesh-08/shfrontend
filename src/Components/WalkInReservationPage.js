import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const WalkInReservationPage = () => {
  const [bookingDetails, setBookingDetails] = useState({
    guestName: '',
    room: { room_id: '' },
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  if (location && location.state && location.state.room) {
    setBookingDetails(prev => ({
      ...prev,
      room: { ...prev.room, room_id: location.state.room.room_id }
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('room')) {
      setBookingDetails(prev => ({
        ...prev,
        room: { ...prev.room, room_id: value }
      }));
    } else {
      setBookingDetails(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8181/api/hotel-staff/walk-in-reservation', bookingDetails);
      if (response.status === 200) {
        setSuccessMessage('Walk-in reservation added successfully');
        setBookingDetails({
          guestName: '',
          room: { room_id: '' },
          startDate: '',
          endDate: ''
        });
      } else {
        setError('Failed to add walk-in reservation');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('The room is already occupied by another guest');
    }
  };

  const styles = {
    container: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '600px',
      margin: 'auto',
      marginTop: '50px',
    },
    title: {
      color: '#333',
      textAlign: 'center'
    },
    input: {
      display: 'block',
      margin: '10px 0',
      padding: '10px',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
    },
    successMessage: {
      color: 'green',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Walk-in Reservation</h2>
      {error && <div style={styles.errorMessage}>{error}</div>}
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input style={styles.input}
               type="text"
               name="guestName"
               placeholder="Guest Name"
               value={bookingDetails.guestName}
               onChange={handleChange}
        />
        <input style={styles.input}
               type="text"
               name="room.room_id"
               placeholder="Room ID"
               value={bookingDetails.room.room_id}
               onChange={handleChange}
               readOnly={false}
        />
        <input style={styles.input}
               type="date"
               name="startDate"
               value={bookingDetails.startDate}
               onChange={handleChange}
        />
        <input style={styles.input}
               type="date"
               name="endDate"
               value={bookingDetails.endDate}
               onChange={handleChange}
        />
        <button style={styles.button} type="submit">Add Reservation</button>
      </form>
    </div>
  );
};

export default WalkInReservationPage;