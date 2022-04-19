import React, { Fragment, useEffect } from "react";
import { FaReacteurope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../redux/actions/productAction";
import Loader from "../utils/Loader";
import AllProduct from "./AllProducts";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2>Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <AllProduct product={product} key={product._id} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
