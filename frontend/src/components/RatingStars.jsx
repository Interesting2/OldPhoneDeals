import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import React from 'react';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating); // Get the number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star

  return (
    <div className="rating-review">
      {[...Array(fullStars)].map((_, index) => (
        <BsStarFill key={index} style={{ color: 'yellow' }}/>
      ))}
      {hasHalfStar && <BsStarHalf style={{ color: 'yellow' }}/>}
      {[...Array(5 - fullStars - hasHalfStar)].map((_, index) => (
        <BsStar key={index} style={{ color: 'yellow' }}/>
      ))}
    </div>
  );
};

export default RatingStars;