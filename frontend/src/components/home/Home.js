import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { BsFillMouse3Fill } from "react-icons/bs";
import AllProducts from "../product/AllProducts";
import MetaData from "../layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import { getProducts } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../utils/Loader";

const Home = () => {
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (error) {
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Fragment>
      <MetaData title="E-Commerce" />
      <div className="banner">
        <p>Welcome to E-Commerce</p>
        <h1>Find Amazing Products</h1>
        <a href="#product_container">
          <button>
            Scroll
            <BsFillMouse3Fill />
          </button>
        </a>
      </div>
      <div id="product_container">
        <h2 className="homeHeading">Featured Products</h2>
        <h3>List of all the products</h3>
        <div className="container" id="container">
          <ToastContainer />
          {loading && <Loader />}
          {products && products.map((product) => <AllProducts product={product} key={product._id}/>)}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
