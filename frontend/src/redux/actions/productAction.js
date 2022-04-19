import api from "../../apis/ecommerceAPI";
import {
  ALL_PRODUCT_FAILURE,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const response = await api.get("/api/products");
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: response.data.products });
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAILURE, payload: error.response.data });
  }
};


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const response = await api.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data.product });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAILURE, payload: error.response.data });
  }
};

export const clearErrors = async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearProductDetails = async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_RESET });
};

