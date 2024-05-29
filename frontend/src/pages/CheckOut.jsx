import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import { renderComponent, unrenderComponent, resetRenderedComponents} from '../redux/reducers/componentsSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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


  const [cart, setCart] = useState([]);
  const secretKey = 'Justin-Secret';

  // Function to decrypt the item
  const decryptItem = (encryptedItem, secretKey) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedItem, secretKey);
    const decryptedItemString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const decryptedItem = JSON.parse(decryptedItemString);
    return decryptedItem;
  };

  // Function to encrypt the item
  const encryptItem = (item, secretKey) => {
    const itemString = JSON.stringify(item);
    const encryptedItem = CryptoJS.AES.encrypt(itemString, secretKey).toString();
    return encryptedItem;
  };

  // Function to encrypt the cart items and save them to local storage
  const encryptAndSaveCart = (cartItems) => {
    const encryptedItems = cartItems.map(item => encryptItem(item, secretKey));
    localStorage.setItem('cartItems', JSON.stringify(encryptedItems));
  };

  useEffect(() => {
    const encryptedItemsString = localStorage.getItem('cartItems');
    if (encryptedItemsString) {
      try {
        const encryptedItems = JSON.parse(encryptedItemsString);
        const decryptedItems = encryptedItems.map(encryptedItem => {
          return decryptItem(encryptedItem, secretKey);
        });
        setCart(decryptedItems);
      } catch (error) {
        console.error('Error parsing or decrypting items:', error);
      }
    }
  }, []);

  useEffect(() => {
    encryptAndSaveCart(cart);
  }, [cart]);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleQuantityChange = (index, event) => {
    const newCart = [...cart];
    newCart[index].quantity = Number(event.target.value);
    if(newCart[index].quantity === 0) {
      newCart.splice(index, 1); // remove the item if quantity is 0
    }
    setCart(newCart);
  };

  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1); // remove the item from cart
    setCart(newCart);
  };

  const handleConfirmTransaction = () => {
    // Create transaction details
    const transactionDetails = cart.map(item => ({
      ID: item._id,
      quantity: item.quantity,
    }));
    // Send transaction details to server
    axios.post('http://localhost:3500/api/transaction', transactionDetails)
        .then(response => {
          if (response.status === 200) {
            // Reset the cart
            setCart([]);
            localStorage.removeItem('cartItems');
            alert('Transaction successful!');
            // Redirect to Main Page
            dispatch(resetRenderedComponents())
            navigate("/");
          } else {
            console.error('Error processing transaction:', response);
          }
        })
        .catch(error => {
          console.error('Error processing transaction:', error);
        });
  };

  return (
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        {cart.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <input type="number" min="0" max={item.stock} value={item.quantity} onChange={(event) => handleQuantityChange(index, event)} />
              <button onClick={() => handleRemoveItem(index)}>Remove item</button>
            </div>
        ))}
        <h2>Total Price: {totalPrice}</h2>
        <button onClick={handleConfirmTransaction}>Confirm Transaction</button>
      </div>
  );
};

export default CheckoutPage;