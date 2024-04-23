import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
export function GenerateInvoicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state.booking || null;

  const startDate = new Date(bookingData.startDate);
  const endDate = new Date(bookingData.endDate);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const amount = daysDifference * bookingData.room.price;

  const [invoiceId, setInvoiceId] = useState(null);
  const [customerName, setCustomerName] = useState('');


  useEffect(() => {
    axios.post('http://localhost:8181/api/hotel-staff/save/invoice', { invoice_id: 0, booking: bookingData, amount: amount })
      .then(response => {
        console.log('Invoice generated', response.data);
        setInvoiceId(response.data.invoice_id + 100);
        setCustomerName(bookingData?.user.role_id === 1 ? bookingData.members[0].firstName : bookingData.user.firstName);
      })
      .catch(error => {
        console.error('Error generating invoice', error);
      });
  }, []);

  const download = async () => {
    const element = document.querySelector(".container");
    if (element) { // Ensure element exists to avoid errors in PDF generation
      html2pdf().from(element).set({
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).save();
    } else {
      console.error("Download PDF failed: Element not found");
    }
  }


  return (
    
    <div >
      <button className="downloadButton" onClick={download}>Download</button>
    <div className="container">
      <h2>Generate Invoice</h2>
      <table>
        <tbody>
          <tr>
            <th>Invoice ID</th>
            <td>{invoiceId}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{amount}</td>
          </tr>
          <tr>
            <th>Customer Name</th>
            <td>{customerName}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
    </div>
  );
}

export default GenerateInvoicePage;