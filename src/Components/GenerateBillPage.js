import React, { useState } from 'react';

function GenerateBillPage() {
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  const [billDetails, setBillDetails] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8181/api/hotel-staff/generate-bill/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ booking_id: bookingId })
      });
      if (response.ok) {
        const data = await response.text();
        setBillDetails(data);
        setError(''); // Clear error if successful
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to generate bill');
        setBillDetails(''); // Clear bill details in case of error
      }
    } catch (error) {
      console.error('Error:', error);
      setError('No booking ID exists to generate bill');
      setBillDetails(''); // Clear bill details in case of error
    }
  };

  return (
    <div>
      <h2>Generate Bill</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Booking ID"
          value={bookingId}
          onChange={e => setBookingId(e.target.value)}
        />
        <button type="submit">Generate Bill</button>
      </form>
      {billDetails && <div className="success">{billDetails}</div>}
    </div>
  );
}

export default GenerateBillPage;