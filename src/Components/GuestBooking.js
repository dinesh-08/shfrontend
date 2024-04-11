import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GuestBooking = () => {
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('4');  // Default capacity is 4
  const [price, setPrice] = useState('100'); // Default price is 100
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    switch (roomType) {
      case "King":
        setPrice("100.00");
        setCapacity('3');
        break;
      case "Queen":
        setPrice("120.00");
        setCapacity('4');
        break;
      case "Suite-King":
        setPrice("130.00");
        setCapacity('3');
        break;
      case "Suite-Queen":
        setPrice("140.00");
        setCapacity('4');
        break;
      default:
        setPrice('100');
        setCapacity('4'); // Resets to default for other or no selection
    }
  }, [roomType]);

  useEffect(() => {
    if (rooms.length > 0) {
      // Once rooms are filtered, we'll display them, hence no navigation here
    }
  }, [rooms, navigate]);

  const handleFilter = () => {
    axios.get('http://localhost:8181/api/guest/filter-rooms', {
      params: {
        roomType: roomType,
        capacity: capacity,
        price: price
      }
    })
    .then(response => {
      setRooms(response.data); // Storing entire room details
    })
    .catch(error => {
      console.error("There was an error with the filter API call:", error);
    });
  };

  const handleBooking = (room) => {
    navigate('/OnlineBooking', { state: { room: room } }); // Navigate to walkinReservation page with the room data stored in state
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <style>{`
        select, button {
          padding: 10px;
          margin: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
        }
        button:hover {
          cursor: pointer;
          background-color: #f0f0f0;
        }
      `}</style>
      <select value={roomType} onChange={e => setRoomType(e.target.value)}>
        <option value="">Select Room Type</option>
        <option value="King">King</option>
        <option value="Queen">Queen</option>
        <option value="Suite-King">Suite-King</option>
        <option value="Suite-Queen">Suite-Queen</option>
      </select>
      <select value={capacity} onChange={e => setCapacity(e.target.value)} disabled>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <select value={price} onChange={e => setPrice(e.target.value)} disabled>
      <option value="100.00">100.00</option>
                <option value="120.00">120.00</option>
                <option value="130.00">130.00</option>
                <option value="140.00">140.00</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
      {rooms.map((room) => (
        <div key={room.room_id} style={{ margin: '10px 0', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          Room ID: {room.room_id}, Type: {room.type}
          <button onClick={() => handleBooking(room)} style={{ marginLeft: '10px' }}>Book</button>
        </div>
      ))}
    </div>
  );
};

export default GuestBooking;