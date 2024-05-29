import React, {useState, useEffect} from 'react';
import { Link , NavLink, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { BsChevronDown, BsSearch } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/reducers/searchTermSlice';
import { setMaxPrice_, setBrand_ } from '../redux/reducers/filterSlice';
import { renderComponent, unrenderComponent } from '../redux/reducers/componentsSlice';
import axios from 'axios';


const NavBar = ({searchTerm, isSignedin}) => {
  // console.log(searchTerm)
  const location = useLocation();
  const navigate = useNavigate();
  const renderedComponents = useSelector((state) => state.components.renderedComponents);

  const [component, setComponent] = useState(renderedComponents[renderedComponents.length - 1]);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [brand, setBrand] = useState('Any');
  const [brandName, setBrandName] = useState('Any');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [searchActive, setSearchActive] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const componentTemp = renderedComponents[renderedComponents.length - 1];
    console.log("Rendered component list CHANGED");
    console.log(renderedComponents)
    setComponent(componentTemp);
  }, [renderedComponents]);


  const handleNavigateProfile = () => {
    navigate('/user');
  }

  const handleCheckoutClick = () => {
    navigate('/checkout');
  }

  const handleApplyFilter = () => {
    console.log("Apply Filter");
    console.log("Max Price: " + maxPrice);
    console.log("Brand: " + brand);
    
    dispatch(setMaxPrice_(parseInt(maxPrice)));
    dispatch(setBrand_(brand));
  }

  const handleSelectBrand = (value) => {
    setDropdownVisible(!dropdownVisible);
    setBrand(value);
    setBrandName(value);
    console.log("Brand selected: " + value);

  }

  const changeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  }

  const saveMaxPrice = (e) => {
    console.log(maxPrice);
  }

  const showDropDown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    // Do something with searchText
    console.log(searchText);
    if (searchText.trim() === "") {
      // show popup 
      alert("Search Term cannot be empty!")
      return;
    }
    setSearchActive(true);
    dispatch(setSearchTerm(searchText));
    dispatch(renderComponent('search'));
  }

  const handleSignInClick = () => {
    navigate('/signin');
  }

  const handleSignOutClick = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      console.log("Confirmed")
      localStorage.removeItem('token');
      window.location.reload();
    }
  };  

  
  

  const step = 20;
  const roundedValue = Math.round(maxPrice / step) * step;
  const sliderStyle = {
    background: `linear-gradient(to right, rgba(240, 240, 240, 0.05) 0%, rgba(45, 75, 112, 0.8) ${roundedValue / 10}%, #ddd ${roundedValue / 10}%, #ddd 100%)`
  };
 
  return (
    <div className="navbar-container">
        <div className="logo">
          {/* <h2>OldPhoneDeals</h2> */}
          <NavLink
            style={{ textDecoration:'none' }}
              // style={({ isActive }) => {
            //   return isActive ? { color: 'red'} : { color: 'green'}
            // }}
            to="/"
            >
              {/* {({ isActive }) => {
                return isActive ? "Home Active" : "Home Inactive"
              }} */}
              <h2 className="logo-name">OldPhoneDeals</h2>
            </NavLink>
        </div>

        <div className={`${(component === 'search') ? 'mid narrow' : 'mid wide'}`}>
          <div className="search-bar">
            <input className="search-bar-input" type="text" placeholder="Search" value={searchText} onChange={handleInputChange} />
            <button onClick={handleSearch}>
              <BsSearch className="search-icon"> 
                
              </BsSearch>
            </button>
          </div>

        </div>
        

        {component === "search" && (
           <div className={`${(searchActive && searchTerm) ? 'utility show' : 'utility hide'}`}>
            <div className="range-slider">
              <div className="value">
                <p>Max Price: ${maxPrice}</p>
              </div>
              <div className="range">
                <div className="slider">
                  <input style={sliderStyle} type="range" step="50" value={maxPrice} min="0" max="1000" onChange={changeMaxPrice} onMouseUp={saveMaxPrice}/>
                </div>
                
  
                
              </div>
            </div>
          
  
            <div className="dropdown">
                <button className="drop-btn">
                  {brandName}
                  <BsChevronDown className="down-icon" size={20} color="rgba(0, 0, 0, 0.8)" onClick={showDropDown}/>
                </button>
                {dropdownVisible && (
                  <div className="dropdown-content">
                    <p onClick={() => handleSelectBrand('Any')}>Any</p>
                    <p onClick={() => handleSelectBrand('Apple')}>Apple</p>
                    <p onClick={() => handleSelectBrand('Samsung')}>Samsung</p>
                    <p onClick={() => handleSelectBrand('LG')}>LG</p>
                    <p onClick={() => handleSelectBrand('Huawei')}>Huawei</p>
                    <p onClick={() => handleSelectBrand('Sony')}>Sony</p>
                    <p onClick={() => handleSelectBrand('Nokia')}>Motorola</p>
                  </div>
                )}
            </div>
  
            <div className="apply-btn">
              <button onClick={handleApplyFilter}>Filter</button>
            </div>
          </div>
        )}
        
       
        

        <div className="right">
            <button onClick={handleCheckoutClick} className="checkout-btn">Checkout</button>
            {isSignedin ? (
              <>
              <button onClick={handleNavigateProfile} className="profile">Profile</button>
               <button onClick={handleSignOutClick} className="signout-btn">
                Sign Out
              </button>
              </>
            ) : (
              <button onClick={handleSignInClick} className="signin-btn">
                  Signin
                </button>
            )}
            
           
           
        </div>


    </div>
    
  )
}

export default NavBar;