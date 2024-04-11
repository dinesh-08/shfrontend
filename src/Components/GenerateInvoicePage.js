
import React, { useState, useEffect } from "react";export function GenerateInvoicePage() {
  
  const [bookingId, setBookingId] = React.useState('');
  const [error, setError] = React.useState('');
  const [invoiceDetails, setInvoiceDetails] = React.useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8181/api/hotel-staff/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ booking_id: bookingId })
      });
      if (response.ok) {
        const data = await response.text();
        setInvoiceDetails(data);
      } else {
        const data = await response.json();
        setError(data.message || 'The invoice has already been generated');
        setInvoiceDetails('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('No booking ID exists to generate an invoice');
      setInvoiceDetails('');
    }
  };

  return React.createElement('div', null,
    React.createElement('h2', null, 'Generate Invoice'),
    error && React.createElement('div', { className: 'error' }, error),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Booking ID',
        value: bookingId,
        onChange: e => setBookingId(e.target.value)
      }),
      React.createElement('button', { type: 'submit' }, 'Generate Invoice')
    ),
    invoiceDetails && React.createElement('div', { className: 'success' }, invoiceDetails)
  );
}
