import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {

  const handleSubmit = () => {
  

    navigate('/guestBooking');
}

  const navigate = useNavigate();
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <div style={{color: 'blue', fontWeight: 'bold', fontSize: '40px'}}>
          Welcome to Shambala Hotel Reservation System
        </div>
        <button style={{marginTop: '20px', padding: '10px', fontSize: '20px'}} onClick={handleSubmit}>
          Guest Booking
        </button>
      </div>
    );
  }

  export default CustomerDashboard;