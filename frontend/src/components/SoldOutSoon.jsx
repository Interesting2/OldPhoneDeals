import React from 'react'
import './BestSellers.css';
import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../redux/reducers/selectedItemSlice';
import { renderComponent, unrenderComponent } from '../redux/reducers/componentsSlice';



const SoldOutSoon = ({soldOutSoon}) => {
  console.log(soldOutSoon)
  const dispatch = useDispatch();

  const handleItemClick = (item) => {
      dispatch(setSelectedItem(item));
      dispatch(renderComponent('selected'));
  };

  return (
    <div className="sold-out-soon-container">
        <div className="seller-header">
            <h2>Sold Out Soon</h2>
        </div>
        <div className="items-container">
          {soldOutSoon.map((item) => (
            <div className="item" key={item._id} onClick={() => {handleItemClick(item)}}>
                <div className="item-img">
                    <img src={`/phone_default_images/${item.brand}.jpeg`} alt={item.name} />
                </div>
                <div className="item-description">
                    <div className="item-brand">
                        <p>{item.brand}</p>
                    </div>
                    <div className="item-name">
                        <p>{item.title}</p>
                    </div>
                    
                </div>
                <div className="item-footer">
                    {/* <div className="item-rating">
                        {[...Array(Math.floor(item.avgRating))].map((star, index) => (
                            <BsStarFill key={index} />
                        ))}
                        {item.avgRating % 1 !== 0 && <BsStarHalf />}
                        {[...Array(Math.floor(5 - item.avgRating))].map((star, index) => (
                            <BsStar key={index} />
                        ))}
                    </div> */}
                    <div className="item-price">
                        <p>${item.price}</p>
                    </div>
                </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default SoldOutSoon;