import React, { useState } from 'react';
import axios from "axios";

function ChangePassword() {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

  function handleInputChange(event) {
    setPasswords({ ...passwords, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
              Authorization: `Bearer ${token}`
        }
    };
    await axios.put('http://localhost:3500/api/user/updatepwd', passwords, config);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="currentPassword" type="password" value={passwords.currentPassword} onChange={handleInputChange} placeholder="Current Password"/>
      <input name="newPassword" type="password" value={passwords.newPassword} onChange={handleInputChange} placeholder="New Password"/>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePassword;
