import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfile() {
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('http://localhost:3500/api/user/profile', config);
      setUser(response.data);
    };
    fetchUserProfile();
  }, []);


  function handleInputChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const password = window.prompt('Please enter your password to confirm changes');
    if (password) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const userUpdate = { firstname: user.firstname, lastname: user.lastname, email: user.email, password };
      axios.put('http://localhost:3500/api/user/profile', userUpdate, config)
          .then(response => {
            if (response.status === 200) {
              alert('Profile updated successfully');
            }
          }).catch(error => {
            alert(error.response.data.message);
            //reload component
          window.location.reload();
          })
    } else {
      alert('Please enter your password to confirm changes');
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" value={user.firstname} onChange={handleInputChange} />
      <input name="lastname" value={user.lastname} onChange={handleInputChange} />
      <input name="email" value={user.email} onChange={handleInputChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default EditProfile;
