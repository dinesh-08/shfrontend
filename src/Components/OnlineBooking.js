import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const OnlineBooking = () => {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const room_id = location.state.room.roomNo || '';
  const room = location.state.room;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [securityNo, setSecurityNo] = useState('');

  const handleBook = () => {
    if ( !startDate || !endDate || members.length === 0) {
      alert('Please fill out all fields before booking.');
      return;
    }
    axios.post('http://localhost:8181/api/hotel-staff/walk-in-reservation', {
      room,
      userid: sessionStorage.getItem("userid"),
      startDate,
      endDate,
      members,
      isdeleted: false,
    })
    .then(response => {
      const bookingId = response.data;
      alert('Booking successful!');
      navigate('/viewmybookinghistory', { state: { bookingId } });
     
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error making reservation.');
    });
  };


  const handleAddMember = () => {
    if (!firstName || !lastName || !age || !gender || !phoneNo || !email || !securityNo) {
      alert('Please fill out all member details before adding.');
      return;
    }
    const newMember = { firstName, lastName, age, gender, phoneNo, email, securityNo };
    setMembers(prevMembers => [...prevMembers, newMember]);
    // Reset form fields after adding a member
    setFirstName('');
    setLastName('');
    setAge('');
    setGender('');
    setPhoneNo('');
    setEmail('');
    setSecurityNo('');
    setShowModal(false);
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
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Online Room Booking</h1>
      <h5>Room ID</h5>
      <input style={styles.input} type="text" name="room_id" value={room_id} readOnly />
      <h5>Guest Name</h5>
      <input style={styles.input} type="text" name="guestName" value={sessionStorage.getItem("userid")} onChange={(e) => setGuestName(e.target.value)} />
      <h5>Start Date</h5>
      <input style={styles.input} type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <h5>End Date</h5>
      <input style={styles.input} type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button style={styles.button} onClick={() => setShowModal(true)}>Add Member</button>
      <button style={styles.button} onClick={handleBook}>Book</button>
      {showModal && (
        <>
          <div style={styles.overlay}></div>
          <div style={styles.modal}>
            <h2>Add Member</h2>
            <input style={styles.input} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input style={styles.input} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input style={styles.input} placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input style={styles.input} placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <input style={styles.input} placeholder="Phone No" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input style={styles.input} placeholder="Security No" value={securityNo} onChange={(e) => setSecurityNo(e.target.value)} />
            <button style={styles.button} onClick={handleAddMember}>Add</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OnlineBooking;