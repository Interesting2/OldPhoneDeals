import React, {useState} from 'react'
import './BestSellers.css';
import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../redux/reducers/selectedItemSlice';
import { renderComponent, unrenderComponent } from '../redux/reducers/componentsSlice';
import RatingStars from './RatingStars';

const BestSellers = ({bestSellers}) => {
    const dispatch = useDispatch();

    const handleItemClick = (item) => {
        dispatch(setSelectedItem(item));
        dispatch(renderComponent('selected'));
    };

    return (    
        <div className="best-sellers-container">
            <div className="seller-header">
                <h2>Best Sellers</h2>
            </div>
            <div className="items-container">
                {bestSellers.map((item) => (
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
                            <div className="item-price">
                                <p>${item.price}</p>
                            </div>
                        </div>
                        <div className="item-footer">
                            <RatingStars rating={item.avgRating}/>

                        </div>
                    </div>
                ))}
                
            
            </div>
        </div>
    )
}

export default BestSellers;