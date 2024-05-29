// import Metamask from './Test_Ethers';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ResetpwdPage from './pages/ResetpwdPage';
import CheckOut from './pages/CheckOut';
import User from './pages/User';
import HomePage from './pages/HomePage';
import VerificationPage from './pages/VerificationPage';
import ResetPasswordForm from './pages/ResetpwdForm';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';

function App() {
  
  return (
    <div className="App">

      <Router>

        <Routes>  
          <Route path="/" element={ <HomePage/> } />
          <Route path="/signup" element={ <SignupPage/> } />
          <Route path="/signin" element={ <SigninPage/> } />
          <Route path="/reset-password" element={ <ResetpwdPage/> } />
          <Route path="/reset/:token" element={ <ResetPasswordForm /> } />
          <Route path="/verify" element={ <VerificationPage/> } />
          <Route path="/CheckOut" element={<CheckOut/>} />
          <Route path="/User" element={<User/>} />
        </Routes>
      </Router>

   
      </div>
  );
}
export default App;
