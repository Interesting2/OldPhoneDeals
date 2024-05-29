import React, {useState} from 'react'
import { renderComponent, unrenderComponent } from '../redux/reducers/componentsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ItemDetails.css'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import RatingStars from './RatingStars';
import Comment from './Comment'
import axios from 'axios'
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';



const ItemDetails = ({selectedItem}) => {
  const dispatch = useDispatch();
  const [reviewIndex, setReviewIndex] = useState(3);
  // const [showQuantityField, setShowQuantityField] = useState(false);
  const [quantity, setQuantity] = useState(0);
  
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState(selectedItem.reviews);

  const navigate = useNavigate();

  const handleBackClickSearchTerm = () => {
    dispatch(unrenderComponent());
  };


  // Function to encrypt the item
  const encryptItem = (item, secretKey) => {
    const encryptedItem = CryptoJS.AES.encrypt(JSON.stringify(item), secretKey).toString();
    return encryptedItem;
  };

  const verifyUserLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      return axios
        .post('http://localhost:3500/api/user/verifyToken', { token })
        .then(response => {
          console.log(response.status);
          if (response.status === 200) {
            console.log("HERE")
            return Promise.resolve(true);
          } else {
            return Promise.resolve(false);
          }
        })
        .catch(() => {
          return Promise.resolve(false);
        });
    } else {
      return Promise.resolve(false);
    }
  };
  
  const handleAddToCart = () => {
    // if user isn't logged in already
    verifyUserLogin().then(isLoggedIn => {
      console.log(isLoggedIn)
      if (!isLoggedIn) {
        // Handle user not logged in
        console.log("User is not logged in");
        alert("Please login to add items to cart");
        navigate('/signin');

      } else {
        // Proceed with adding to cart
        const quantityInput = window.prompt('Enter a quantity:');
        if (quantityInput) {
          const quantity = Number(quantityInput);
    
          if (!Number.isNaN(quantity) && Number.isInteger(quantity) && quantity > 0) {
            // Quantity is valid, perform further processing
            if (quantity > selectedItem.stock) {
              // Not enough stock
              alert(`Not enough stock: Only ${selectedItem.stock} item(s) left`);
              return;
            } 
            alert(`Added ${quantity} item(s) to cart`);
            setQuantity(quantity);
    
    
            const storedItems = localStorage.getItem('cartItems');
            let cartItems = storedItems ? JSON.parse(storedItems) : [];
    
    
            // Add the new item to the cart
            const item = {
              _id: selectedItem._id,
              title: selectedItem.title,
              price: selectedItem.price,
              quantity: quantity,
              stock: selectedItem.stock
            }
            
            const secretKey = 'Justin-Secret';
    
            // Encrypt the item
            const encryptedItem = encryptItem(item, secretKey);
        
            // Update the cart items state
            const updatedCartItems = [...cartItems, encryptedItem];
    
        
            // Save the updated cart items to local storage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
          } else {
            // Quantity is invalid
            if (Number.isNaN(quantity)) {
              alert('Invalid quantity: Not a number');
            }
            else if (!Number.isInteger(quantity)) {
              alert('Invalid quantity: Not an integer');
            }
            else if (quantity <= 0) {
              alert('Invalid quantity: Must be greater than zero');
            }
          }
        } else {
          // User canceled the prompt
          console.log('Prompt canceled');
        }
      }
    });

   
  };

  const getUserId = () => {
    
  }

  const handleCommentSubmit = () => {
    // Perform any validation checks on comment and rating
    // For example, check if the comment is not empty and rating is within a valid range
  
    // Call the API or perform any necessary database operations to save the comment
    // You can use axios or any other HTTP library to make the request
  
    // Reset the comment and rating state after submission
    const data = {
      comment: comment,
      rating: parseInt(rating),
      itemId: selectedItem._id,
    };  
    console.log(data)

    const token = localStorage.getItem('token');

    if (!token) {
      // Show alert message
      window.alert('Please signin first');
      
      // Navigate to the sign-in page
      window.location.href = '/signin'; 
      return;
    }

    // Set the headers to include the token
    const headers = {
      Authorization: `Bearer ${token}`
    };
    // Make the API request to save the comment
    axios.post('http://localhost:3500/api/comments', data, {headers})
      .then(response => {
        // Handle the response, e.g., show a success message
        const addedReview = (response.data.addedReview);
        console.log(addedReview);

        const newReviews = [...reviews];
        newReviews.push(addedReview);
        console.log(newReviews);

        setReviews(newReviews);
        
        // Reset the comment and rating state after submission
        setComment('');
        setRating(1);
      })
      .catch(error => {
        // Handle any errors that occurred during the request, e.g., show an error message
        console.error('Error saving comment:', error);
    });
    setComment('');
    setRating(0);
  };


  return (
    // <div>ItemDetails</div>
    <div className="item-container">
      <div className="back-btn-container">
          <button className="back-btn" onClick={handleBackClickSearchTerm}>Back</button>
      </div>
      <div className="item-main">
          <div className="item-stock floatLabel">
              {selectedItem.stock > 0 ? (
                <div className="stock">
                  <p>Available stock: {selectedItem.stock}</p>
                </div> 
                ) : (
                  <p className="stock">Out of Stock</p>
              )}

          </div>

          <div className="item-seller">
              <p>Sold by: {selectedItem.seller.firstname} {selectedItem.seller.lastname}</p>
          </div>
          <div className="item-details-img">
              <img src={`/phone_default_images/${selectedItem.brand}.jpeg`}alt="iPhone"  />
          </div>
          <div className="item-info">
            <div className="item-info-top">
              <div className="item-details-title">
                <h2>{selectedItem.title}</h2>
              </div>
              <div className="item-details-brand">
                <p>Brand: {selectedItem.brand}</p>
              </div>
              <div className="item-details-price">
                <p>Total price:</p>
                <p>${selectedItem.price}</p>
              </div>
            </div>
            <div className="item-info-bottom">
              <div className="quantity-field">
                <label htmlFor="quantity" className="floatLabel">Current Added Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  readOnly
                />
              </div>
              
              <button onClick={handleAddToCart}className="add-to-cart-btn">Add to Cart</button>
            </div>
            
          </div>
      </div>
      <div className="item-reviews-container">
        <div className="item-reviews-header">
          {selectedItem.reviews.length === 0 ? (
            <h2>No reviews</h2>
          ) : (
            <h2>Reviews</h2>
          )}
        </div>
        <div className="item-reviews">
          {reviews.slice(0, reviewIndex).map((review) => (
            <div className="item-review" key={review._id}>
               <div className="reviewer-name">
                <p>{review.reviewer.firstname} {review.reviewer.lastname}</p>
              </div>
              <RatingStars rating={review.rating}/>
             
              <Comment text={review.comment}/>
             
            </div>  
          ))}
            
        </div>
        {reviewIndex < reviews.length && (
          <div className="show-more-reviews">
            <button onClick={() => setReviewIndex(reviewIndex + 3)}>Show more reviews</button>
          </div>
        )}
      </div>
      <div className="create-review">
        <h2>Post your Comment</h2>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Please enter your comment" />
        <div className="create-rating">
          <p>Select a Rating</p>
        </div>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <button className="post-comment-btn" onClick={handleCommentSubmit}>Post Comment</button>

      </div>
    </div>
  )
}

export default ItemDetails