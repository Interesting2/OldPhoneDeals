import {useEffect, useState} from 'react';
import './SignupPage.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


function SignupPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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

  const submitSignUp = () => {
    console.log('submit signup');

    axios
      .post('http://localhost:3500/api/signup', formData)
      .then((response) => {
        console.log(response.data);
        window.alert('User created successfully');
      })
      .catch((error) => {
        // handle error
        if (error.response) {
          window.alert(error.response.data.error);
        } else {
          window.alert('Something went wrong!');
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <section>
        
        <div className="container"> 
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="thumbnail">
                <div className="thumbnail-content">
                    <h1>Welcome to OldPhoneDeails</h1>
                    <h4>Are you ready to buy a new phone?</h4>
                    <img src="/thumbnail.jpg" alt="123" />
                </div>
            </div>  
            <div className="form"> 
                <h2 className="form-header">Signup</h2>
                <form action="">
                    <div className="firstname">
                        {/* <span>First Name</span> */}
                        <label htmlFor="firstname" className="floatLabel">First Name</label>
                        <input 
                            type="text" 
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required="required"
                        />

                    </div>
                    <div className="lastname">
                        {/* <span>Last Name</span> */}
                        <label htmlFor="lastname" className="floatLabel">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <div className="email">
                        {/* <span>Email Address</span> */}
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
                        {/* <span>Password</span> */}
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
                        <input onClick={submitSignUp} type="submit" value="SignUp"/> 
                    </div>
                </form>
                <p>Forgot password? <a href="/reset-password">Click Here</a></p>
                <p>Have an account? <a href="/signin">Sign In</a></p>
                <p><a href="/">Back to Home</a></p>
            </div>
        </div> 
    </section>
  );
}

export default SignupPage;
