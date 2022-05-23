import Axios from 'axios';
import * as Types from "../Type/Types";

const baseUrl = process.env.REACT_APP_API_URL;
const oldUrl = process.env.REACT_APP_OLD_API;



/**
 * Home page all product list 
 * @returns getOwnProductList
 */
export const getOwnProductList = () => (dispatch) => {
    const responseData = {
        isLoading: true,
        status: false,
        data: []
    }
    dispatch({ type: Types.GET_OWN_PRODUCT_LIST, payload: responseData });
    Axios.get(`${baseUrl}/product`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.data = res.data.data;
            dispatch({ type: Types.GET_OWN_PRODUCT_LIST, payload: responseData });
        }).catch((err) => {
            responseData.isLoading = false;
            responseData.status = false;
            responseData.data = [];
            dispatch({ type: Types.GET_OWN_PRODUCT_LIST, payload: responseData });

        })
}

/**
 * @param id int product id 
 * @returns productDetails
 */
export const getProductDetails = (product_id) => (dispatch) => {
    const responseData = {
        isLoading: true,
        status: false,
        data: null
    }
    dispatch({ type: Types.GET_PRODUCT_DETAILS, payload: responseData });
    Axios.get(`${oldUrl}/product/${product_id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.data = res.data.data;
            dispatch({ type: Types.GET_PRODUCT_DETAILS, payload: responseData });
        }).catch((err) => {
            responseData.isLoading = false;
            responseData.status = false;
            responseData.data = null
            dispatch({ type: Types.GET_PRODUCT_DETAILS, payload: responseData });

        })
}