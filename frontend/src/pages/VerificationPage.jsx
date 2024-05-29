import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerificationPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const navigate = useNavigate(); // This hook lets you programmatically navigate

  // Create a piece of state for the error message
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/verify?token=${token}`);

        if (response.data.success) {
          setTimeout(() => {
            navigate('/');
            // Handle successful verification
            console.log('Email verified successfully');
          }, 4000);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        // Handle verification error
        if (error.response && error.response.data && error.response.data.error) {
          // Set the error message in state
          setError(error.response.data.error);
        } else {
          setError('Error verifying email');
        }
      }
    };

    verifyEmail();
  }, [navigate, token]);

  // Function to handle button click and redirect to homepage
  const handleButtonClick = () => {
    navigate('/'); 
  };

  return (
    <div>
      <h1>Email Verification</h1>
      {error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleButtonClick}>Return to Homepage</button>
        </div>
      ) : (
        <p>Verifying your email address, you will be redirected to Homepage after verification</p>
      )}
    </div>
  );
}

export default VerificationPage;