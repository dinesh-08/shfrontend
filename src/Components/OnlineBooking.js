import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const OnlineBooking = () => {
  const [guestName, setGuestName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const location = useLocation();
  const room_id = location.state.room.room_id || '';
  const room = location.state.room;

  const handleWalkIn = () => {
    if (!isBooked) {
      axios.post('http://localhost:8181/api/hotel-staff/walk-in-reservation', {
        room,
        guestName,
        startDate,
        endDate
      })
      .then(response => {
        if (response.status === 200) {
          alert('Walk-in reservation added successfully');
          setGuestName('');
          setStartDate('');
          setEndDate('');
          setIsBooked(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('The room is already occupied by another guest');
      });
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
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select a room for reservation:</h1>
      <h5>Room ID</h5>
      <input style={styles.input} type="text" name="roomid" value={room_id} readOnly />
      <h5>Guest Name</h5>
      <input style={styles.input} type="text" name="guestName" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
      <h5>Start Date</h5>
      <input style={styles.input} type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <h5>End Date</h5>
      <input style={styles.input} type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button style={styles.button} onClick={handleWalkIn}>Book</button>
      {/* Additional form elements for reservation */}
    </div>
  );
};

export default OnlineBooking;