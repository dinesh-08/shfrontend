import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "./viewmybook.css";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const Viewmybookinghistory = () => {
  const location = useLocation();
  const bookingId = parseInt(location.state && location.state.bookingId, 10);
  const [bookingDetails, setBookingDetails] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8181/api/hotel-staff/bookingDetails/${bookingId}`)
      .then(response => {
        setBookingDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [bookingId]);

  const download = async () => {
    const element = document.querySelector(".container");
    html2pdf().from(element).set({
      margin: 10,
      filename: 'bookingDetails.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, scrollY: 0, scrollX: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
  }

  return (
    <div className='osp'>
      <h2 className="">Booking Details</h2>
      <button onClick={download}>Download</button>
      <div className="container">
  <table ref={tableRef} className="booking-details">
    <tbody>
      <tr>
        <td>Room Number:</td>
        <td>{bookingDetails?.room?.roomNo}</td>
      </tr>
      <tr>
        <td>Type:</td>
        <td>{bookingDetails?.room?.type}</td>
      </tr>
      <tr>
        <td>Capacity:</td>
        <td>{bookingDetails?.room?.capacity}</td>
      </tr>
      <tr>
        <td>Price:</td>
        <td>{bookingDetails?.room?.price}</td>
      </tr>
      <tr>
        <td>Booked By:</td>
        <td>{bookingDetails?.user?.firstName}</td>
      </tr>
      <tr>
  <td>First Name:</td>
  <td>{bookingDetails?.user?.role_id === 1 ? bookingDetails?.members[0]?.firstName : bookingDetails?.user?.firstName}</td>
</tr>
<tr>
  <td>Mobile Number:</td>
  <td>{bookingDetails?.user?.role_id === 1 ? bookingDetails?.members[0]?.mobileNo : bookingDetails?.user?.mobileNo}</td>
</tr>

    </tbody>
  </table>
</div>

    </div>
  );
}

export default Viewmybookinghistory;