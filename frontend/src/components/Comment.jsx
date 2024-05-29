import React, { useState } from 'react';

const Comment = ({ text }) => {
  const [showFullComment, setShowFullComment] = useState(false);

  const handleShowMore = () => {
    setShowFullComment(true);
  };

  return (
    <div className="comment">
      {text.length <= 200 || showFullComment ? (
        <p>{text}</p>
      ) : (
        <div className="show-more-content">
          <p>{text.slice(0, 200)}...</p>
          <button onClick={handleShowMore}>Show more</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
