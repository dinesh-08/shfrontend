import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './CreateAccount.css'; // Importing CSS for styling

function AddStaff() {
    let navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const validatePassword = () => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) {
            setPasswordError(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8181/api/hotel-staff/user', {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                mobileNo: document.getElementById('mobileNo').value,
                email: document.getElementById('email').value,
                password: password, // Using state for password
                role_id:1,
                userid: document.getElementById('userid').value, // Added userID field
            });
            console.log('Success:', response.data);
            if(response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div className='fery'>
            <form id="registerForm" onSubmit={handleSubmit} className="form-style">

                <label htmlFor="firstName" style={{display: 'flex'}}>
                    <h5> First Name </h5>
                    <input type="text" id="firstName" name="firstName" />
                </label>

                <label htmlFor="lastName" style={{display: 'flex'}}>
                    <h5> Last Name </h5>
                    <input type="text" id="lastName" name="lastName" />
                </label>

                <label htmlFor="mobileNo" style={{display: 'flex'}}>
                    <h5> Mobile No </h5>
                    <input type="text" id="mobileNo" name="mobileNo" />
                </label>

                <label htmlFor="email" style={{display: 'flex'}}>
                    <h5> Email </h5>
                    <input type="email" id="email" name="email" />
                </label>

                <label htmlFor="userid" style={{display: 'flex'}}>
                    <h5> User ID </h5>
                    <input type="text" id="userid" name="userid" />
                </label>

                <label htmlFor="password" style={{display: 'flex'}}>
                    <h5> Password </h5>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br /><br />
                <label htmlFor="confirmPassword" style={{display: 'flex'}}>
                    <h5> Confirm Password </h5>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                {passwordError && <p>Password is weak or doesn't match.</p>}
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default AddStaff;