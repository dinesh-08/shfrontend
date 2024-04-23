import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Report() {

  const [reportData, setReportData] = useState(null);
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

  return (
    <div>
      <h1>Report of {userId}</h1>
      {reportData ? (
        <p>{JSON.stringify(reportData)}</p>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
}

export default Report;