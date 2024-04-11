import React from 'react';
const { useState, useEffect } = React;

function ViewRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8181/api/hotel-staff/get-rooms');
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch rooms');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      }
    };

    fetchRooms();
  }, []);

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h2 style={{position: 'absolute', top: '0', width: '100%', textAlign: 'center'}}>View Rooms</h2>
      <div className="view-rooms-page-container" style={{width: '90%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'auto', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)', marginTop: '20px'}}>
        {error && <div className="error" style={{backgroundColor: '#ffcccc', padding: '10px', borderRadius: '5px', marginBottom: '20px'}}>{error}</div>}
        <div className="rooms-table-container" style={{margin: '0 auto', maxWidth: '100%', overflowX: 'auto'}}>
          <table style={{border: '1px solid #ddd', textAlign: 'left', width: '100%', tableLayout: 'auto', borderRadius: '5px', overflow: 'hidden'}}>
            <thead style={{backgroundColor: '#f2f2f2'}}>
              <tr>
                <th style={{padding: '10px'}}>ID</th>
                <th style={{padding: '10px'}}>Type</th>
                <th style={{padding: '10px'}}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room.room_id} style={{backgroundColor: index % 2 ? '#f9f9f9' : 'white'}}>
                  <td style={{padding: '10px'}}>{room.room_id}</td>
                  <td style={{padding: '10px'}}>{room.type}</td>
                  <td style={{padding: '10px'}}>{room.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewRoomsPage;