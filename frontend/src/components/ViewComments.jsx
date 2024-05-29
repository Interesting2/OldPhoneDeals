import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewComments.css';

function ViewComments() {
  const [comments, setComments] = useState([]);

  const fetchUserComments = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('http://localhost:3500/api/user/comments', config);
    const commentsWithVisibility = response.data.map(listing => ({
      ...listing,
      comments: listing.comments.map(comment => ({ ...comment})),
    }));
    console.log(commentsWithVisibility);
    setComments(commentsWithVisibility);
  };

  useEffect(() => {

    fetchUserComments();
  }, []);

  const toggleHiddenStatus = async (listingId, commentId, hidden) => {
    console.log(listingId)
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put('http://localhost:3500/api/user/comments/visibility', { listingId, reviewId: commentId, hidden }, config);
    fetchUserComments();
  };

  return (
      // <div className="view-comments">
      //   {comments.map((listing) => (
      //       <div key={listing._id}>
      //         <h3>{listing.title}</h3>
      //         {listing.comments.map((comment, index) => (
      //             <div key={index}>
      //               <p>{comment.reviewer}</p>
      //               <p>Rating: {comment.rating}</p>
      //               <p>Comment: {comment.comment}</p>
      //               <button onClick={() => toggleHiddenStatus(listing._id, index, !comment.hidden)}>
      //                 {comment.hidden ? 'Show' : 'Hide'}
      //               </button>
      //             </div>
      //         ))}
      //       </div>
      //   ))}
      // </div>
      <div className="view-comments">
        {comments.map((listing) => (
            <div key={listing._id} className="listing">
              <h3>{listing.title}</h3>
              {listing.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p className="reviewer">{comment.reviewer}</p>
                    <p>Rating: {comment.rating}</p>
                    <p>Comment: {comment.comment}</p>
                    <button onClick={() => toggleHiddenStatus(listing._id, index, !comment.hidden)} className="hide-show-button">
                      {comment.hidden ? 'Show' : 'Hide'}
                    </button>
                  </div>
              ))}
            </div>
        ))}
      </div>
  );
}

export default ViewComments;
