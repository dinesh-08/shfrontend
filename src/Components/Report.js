import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

export function Report() {

  const [reportData, setReportData] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = sessionStorage.getItem("userid");

  useEffect(() => {
    axios.get(`http://localhost:8181/api/hotel-staff/reports/${userId}`)
      .then(response => {
        setReportData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [userId]);


  const handleViewRooms = (key, value) => {
    if (value && key!='emptyRooms') {
      setSelectedRooms(value.map(item => item.room));
    } else {
      setSelectedRooms(value);
    }
    setIsModalOpen(true);
  };

  // const handleViewRooms = (value) => {
  //   if (value && value[0].booking_id) {
  //     setSelectedRooms([value[0].room]);
  //   } else {
  //     setSelectedRooms(value)
  //   }
  //   setIsModalOpen(true);
  // };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Report of {userId}</h1>
      <div style={{ padding: "20px", border: "1px solid #ccc", backgroundColor: "#d4ba97", maxWidth: "800px", margin: "auto" }}>
        {reportData ? (
          <div style={{ marginTop: "10px" }}>
            {Object.entries(reportData).map(([key, value]) => (
              <div key={key} style={{ padding: "10px", borderBottom: "1px solid #f0f0f0" }}>
                <p style={{ display: "flex", justifyContent: "space-between", margin: "0" }}>
                  <span style={{ fontWeight: "bold" }}>{key}:</span>
                  <span>{value.length}</span> {/* Assuming the value is an array */}
                  <button onClick={() => handleViewRooms(key, value)}>View</button>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading report...</p>
        )}
      </div>

      {/* Modal for selected rooms */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div>
          <button onClick={closeModal}>Close</button>
          <table>
            <thead>
              <tr>
                <th style={{ width: "120px" }}>Room ID:</th>
                <th style={{ width: "120px" }}>Capacity:</th>
                <th style={{ width: "120px" }}>Type:</th>
              </tr>
            </thead>
            <tbody>
              {selectedRooms.map(room => (
                <tr key={room.room_id}>
                  <td style={{ width: "120px" }}>{room.roomNo}</td>
                  <td style={{ width: "120px" }}>{room.capacity}</td>
                  <td style={{ width: "120px" }}>{room.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}

export default Report;