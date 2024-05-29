import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:3500/api/user/verifyToken', { token })
          .then(response => {
            if (response.status == 200) {
              navigate(-1);
            }
          })
          .catch(() => {
            navigate("/");
          });
    }
  }, [navigate]);

  const submitSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/signin', formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate(-1); // replace '/previous-page' with the actual route
        
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert ('User name or password is incorrect');
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div className="container"> 
        <div className="form"> 
          <h2 className="form-header">Sign In</h2>
          <form onSubmit={submitSignIn}>
            <div className="email">
              <label htmlFor="email" className="floatLabel">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="password">
              <label htmlFor="password" className="floatLabel">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="submit-btn-container">
              <input type="submit" value="Sign In"/>
            </div>
          </form>
          <p>Forgot password? <a href="/reset-password">Click Here</a></p>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          <p><a href="/">Back to Home</a></p>
        </div>
      </div> 
    </section>
  );
}

export default SignInPage;