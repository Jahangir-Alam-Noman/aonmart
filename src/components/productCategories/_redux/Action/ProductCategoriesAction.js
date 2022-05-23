import Axios from "axios";
import { showToast } from "../../../master/Helper/Notification";
import * as Types from "../Type/Types";

let base_URL = process.env.REACT_APP_API_URL;
 
let axiosConfig = { 
  headers: {
    Accept: "application/json",
  },
};
  
/**
 * Home page all category list
 * @returns getProductMainCategoryList
 */
export const getProductMainCategoryList = () => (dispatch) => {
  const storeInformation = JSON.parse(localStorage.getItem("storeInformation")) || ""
  const store_id = storeInformation.storeID || ""

  const responseData = {
    isLoading: true,
    status: false,
    data: [],
  };
  dispatch({
    type: Types.GET_PRODUCT_CATEGORY_MAIN_LIST,
    payload: responseData,
  });
  Axios.get(`${base_URL}/categories?store_id=${store_id}`,axiosConfig)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      responseData.data = res.data.data;
      dispatch({
        type: Types.GET_PRODUCT_CATEGORY_MAIN_LIST,
        payload: responseData,
      });
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.data = [];
      dispatch({
        type: Types.GET_PRODUCT_CATEGORY_MAIN_LIST,
        payload: responseData,
      });
    });
};

/**
 * main page all sub category list
 * @returns getProductMainCategoryList
 */
export const getMainSubCategoryList = (category_id) => (dispatch) => {
  const responseData = {
    isLoading: true,
    status: false,
    data: [],
    subParent: null,
  };
  dispatch({
    type: Types.GET_PRODUCT_SUB_CATEGORY_MAIN_LIST,
    payload: responseData,
  });

  const SearchInfo = JSON.parse(localStorage.getItem("storeInformation"));

  let url;
  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  if (
    typeof SearchInfo !== "undefined" &&
    SearchInfo !== null &&
    SearchInfo !== ""
  ) {
    // stores/{{store_id}}/products?category_id={{category_id}}
    // url = `/stores/${SearchInfo.store.value}/products?${category_id}`;
    url = `${base_URL}/sub-categories?category_id=${category_id}`;
  } else {
    showToast("error", "Please select an store first");
  }
  // Axios.get(`${url}`, axiosConfig)
  Axios.get(`${url}`, axiosConfig)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      // responseData.subParent = res.data.parent;
      responseData.data = res.data.data;
      dispatch({
        type: Types.GET_PRODUCT_SUB_CATEGORY_MAIN_LIST,
        payload: responseData,
      });
      // dispatch(categoryProductFilter(res.data.data))
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.subParent = null;
      responseData.data = [];
      dispatch({
        type: Types.GET_PRODUCT_SUB_CATEGORY_MAIN_LIST,
        payload: responseData,
      });
    });
};

/**
 * main page all sub category list
 * @returns getProductMainCategoryList
 */
export const getMainSubSubCategory = (sub_category_id) => (dispatch) => {
  let axiosConfig = { 
    headers: {
      Accept: "application/json",
    },
  };

  const responseData = {
    isLoading: true,
    status: false,
    data: [],
    subSubParent: null,
  };
  dispatch({
    type: Types.GET_PRODUCT_SUB_SUB_CATEGORY_MAIN_LIST,
    payload: responseData,
  });
  Axios.get(`${base_URL}/sub-sub-categories?sub_category_id=${sub_category_id}`,axiosConfig)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      responseData.subSubParent = res.data.parent;
      responseData.data = res.data.data;
      dispatch({
        type: Types.GET_PRODUCT_SUB_SUB_CATEGORY_MAIN_LIST,
        payload: responseData,
      });
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.subSubParent = null;
      responseData.data = [];
      dispatch({
        type: Types.GET_PRODUCT_SUB_SUB_CATEGORY_MAIN_LIST,
        payload: responseData,
      });
    });
};

/**
 * @param {object} Category List
 * @returns categories product filter
 */
export const categoryProductFilter = (categoryList) => (dispatch) => {
  let filterProduct = [];
  if (categoryList.length > 0) {
    for (let i = 0; i < categoryList.length; i++) {
      const element = categoryList[i];
      if (element.products.length > 0) {
        for (let j = 0; j < element.products.length; j++) {
          const signleProduct = element.products[j];
          filterProduct.push(signleProduct);
        }
      }
    }
  }
  dispatch({
    type: Types.GET_CATEGORIES_FILTER_PRODUCT,
    payload: filterProduct,
  });
};

/**
 * main page all sub subcategory wise product list
 * @returns getSubSubCategoryWiseProduct
 */
export const getSubSubCategoryWiseProduct =
  (subSubCategory_id) => (dispatch) => {
    const responseData = {
      isLoading: true,
      status: false,
      data: null,
    };
    dispatch({
      type: Types.SUB_SUBCATEGORY_WISE_PRODUCT,
      payload: responseData,
    });
    Axios.get(`/subSubcategory/${subSubCategory_id}`,axiosConfig)
      .then((res) => {
        responseData.isLoading = false;
        responseData.status = true;
        responseData.data = res.data.data;
        dispatch({
          type: Types.SUB_SUBCATEGORY_WISE_PRODUCT,
          payload: responseData,
        });
      })
      .catch((err) => {
        responseData.isLoading = false;
        responseData.status = false;
        responseData.data = null;
        dispatch({
          type: Types.SUB_SUBCATEGORY_WISE_PRODUCT,
          payload: responseData,
        });
      });
  };


  
  
  
  
  
  
  // try fetch Category Products

  export const getCategoriesProducts = (category_id) => (dispatch) => {
    const responseData = {
      isLoading: true,
      status: false,
      data: [],
      subParent: null,
    };
    dispatch({
      type: Types.GET_CATEGORIES_PRODUCTS,
      payload: responseData,
    });
  
    const SearchInfo = JSON.parse(localStorage.getItem("storeInformation"));
  
    let url;
    let axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };
  
    if (
      typeof SearchInfo !== "undefined" &&
      SearchInfo !== null &&
      SearchInfo !== ""
    ) {
     
      url = `${base_URL}/stores/${SearchInfo.store.value}/products?category_id=${category_id}`;
    } else {
      showToast("error", "Please select an store first");
    }
    Axios.get(`${url}`, axiosConfig)
      .then((res) => {
        responseData.isLoading = false;
        responseData.status = true;
        // responseData.subParent = res.data.parent;
        responseData.data = res.data.data;
        dispatch({
          type: Types.GET_CATEGORIES_PRODUCTS,
          payload: responseData,
        });
        // dispatch(categoryProductFilter(res.data.data))
      })
      .catch((err) => {
        responseData.isLoading = false;
        responseData.status = false;
        responseData.subParent = null;
        responseData.data = [];
        dispatch({
          type: Types.GET_CATEGORIES_PRODUCTS,
          payload: responseData,
        });
      });
  };
  
// fetch sub categoris product

  export const getSubCategoriesProducts = (SubCategory_id) => (dispatch) => {
    localStorage.setItem("SubCategory_id",JSON.stringify(SubCategory_id))
    const category_item = JSON.parse(localStorage.getItem("category_item")) || ""
  const category_id = category_item.id || ""
    const responseData = {
      isLoading: true,
      status: false,
      data: [],
      subParent: null,
    };
    dispatch({
      type: Types.GET_SUB_CATEGORIES_PRODUCTS,
      payload: responseData,
    });
  
    const SearchInfo = JSON.parse(localStorage.getItem("storeInformation"));
  
    let url;
    let axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };
  
    if (
      typeof SearchInfo !== "undefined" &&
      SearchInfo !== null &&
      SearchInfo !== ""
    ) {
      // {{base_url}}/stores/{{store_id}}/products?category_id={{category_id}}&subcategory_id={{subcategory_id}}
      // {{base_url}}/stores/{{store_id}}/products?category_id={{category_id}}
      // stores/{{store_id}}/products?category_id={{category_id}}
      // url = `/stores/${SearchInfo.store.value}/products?${category_id}`;
      
      url = `${base_URL}/stores/${SearchInfo.store.value}/products?category_id=${category_id}&subcategory_id=${SubCategory_id}`;
    } else {
      showToast("error", "Please select an store first");
    }
    Axios.get(`${url}`, axiosConfig)
      .then((res) => {
        responseData.isLoading = false;
        responseData.status = true;
        // responseData.subParent = res.data.parent;
        responseData.data = res.data.data;
        dispatch({
          type: Types.GET_SUB_CATEGORIES_PRODUCTS,
          payload: responseData,
        });
        // dispatch(categoryProductFilter(res.data.data))
      })
      .catch((err) => {
        responseData.isLoading = false;
        responseData.status = false;
        responseData.subParent = null;
        responseData.data = [];
        dispatch({
          type: Types.GET_SUB_CATEGORIES_PRODUCTS,
          payload: responseData,
        });
      });
  };
  

// fetch sub sub category product 

export const getSubSubCategoriesProducts = (SubSubCategory_id) => (dispatch) => {
  const category_item = JSON.parse(localStorage.getItem("category_item")) || ""
const category_id = category_item.id || ""
const SubCategory_id = JSON.parse(localStorage.getItem("SubCategory_id"))
  const responseData = {
    isLoading: true,
    status: false,
    data: [],
    subParent: null,
  };
  dispatch({
    type: Types.GET_SUB_SUB_CATEGORIES_PRODUCTS,
    payload: responseData,
  });

  const SearchInfo = JSON.parse(localStorage.getItem("storeInformation"));

  let url;
  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  if (
    typeof SearchInfo !== "undefined" &&
    SearchInfo !== null &&
    SearchInfo !== ""
  ) {
    
    url = `${base_URL}/stores/${SearchInfo.store.value}/products?category_id=${category_id}&subcategory_id=${SubCategory_id}&sub_subcategory_id=${SubSubCategory_id}`;
  } else {
    showToast("error", "Please select an store first");
  }
  Axios.get(`${url}`, axiosConfig)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      // responseData.subParent = res.data.parent;
      responseData.data = res.data.data;
      dispatch({
        type: Types.GET_SUB_SUB_CATEGORIES_PRODUCTS,
        payload: responseData,
      });
      // dispatch(categoryProductFilter(res.data.data))
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.subParent = null;
      responseData.data = [];
      dispatch({
        type: Types.GET_SUB_SUB_CATEGORIES_PRODUCTS,
        payload: responseData,
      });
    });
};
