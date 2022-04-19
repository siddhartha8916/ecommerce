import React  from "react";
import "./AllProducts.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Card from "../utils/Card";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};

const AllProduct = ({ product }) => {
  return (
    <Card className="productCard">
      <Link to={`/product/${product._id}`}>
        <div>
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <h4>{product.name}</h4>
        <div className="ratings">
          <ReactStars value={product.ratings} {...options} /> <span> ({product.numOfReviews} Reviews) </span>
        </div>
        <span>₹ {product.price}</span>
      </Link>
    </Card>
  );
};

export default AllProduct;
