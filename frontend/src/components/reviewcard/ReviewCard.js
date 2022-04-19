import React, { Fragment } from "react";
import ReactStars from "react-rating-stars-component";
import Card from "../utils/Card";
import "./reviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 14 : 18,
  };

  return (
    <Card className="review-card">
        <div>
          <img
            src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"
            alt="title"
          />
        </div>
        <div className="review-content">
          <div className="review-ratings">
            <ReactStars value={review.rating} {...options} />
            <h4>{review.name} </h4>
          </div>
          <p>{review.comment}</p>
        </div>
      </Card>
  );
};

export default ReviewCard;
