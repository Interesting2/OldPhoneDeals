import React, { useState } from 'react';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePwd';
import ManageListings from '../components/ManageListings';
import ViewComments from '../components/ViewComments';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function UserPage() {
  const [activeTab, setActiveTab] = useState('edit-profile');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:3500/api/user/verifyToken', { token })
                .then(response => {
                    if (response.status !== 200) {
                        navigate('/signin');
                    }
                })
                .catch(() => {
                    navigate('/signin');
                });
        } else {
            navigate('/signin');
        }
    }, [navigate]);

  function signOut() {
      if (window.confirm('Are you sure you want to sign out?')) {
          localStorage.removeItem('token');
          navigate('/');  // redirect to Home page
      }
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
          <button onClick={() => navigate('/')}>Back to Home</button>
        <button onClick={() => setActiveTab('edit-profile')}>Edit Profile</button>
        <button onClick={() => setActiveTab('change-password')}>Change Password</button>
        <button onClick={() => setActiveTab('manage-listings')}>Manage Listings</button>
        <button onClick={() => setActiveTab('view-comments')}>View Comments</button>
        <button onClick={signOut}>Sign Out</button>
      </div>

      <div>
        {activeTab === 'edit-profile' && <EditProfile />}
        {activeTab === 'change-password' && <ChangePassword />}
        {activeTab === 'manage-listings' && <ManageListings />}
        {activeTab === 'view-comments' && <ViewComments />}
      </div>
    </div>
  );
}

export default UserPage;
