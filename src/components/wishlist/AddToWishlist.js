import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../_redux/_global_store/action/GlobalAction";
import { getUserDataAction } from "./../_redux/getUserData/Action/UserDataAction";
import { addToWishlistAction } from "./_redux/action/WishlistAction";
import SmallLoading from "./../master/simpleLoading/SmallLoading";
/**
 * @param {id} need product id for added product in wishlist
 * @returns AddToWishlist component
 */ 
const AddToWishlist = ({ id }) => {
   
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserDataReducer.userData);
  const isAdding = useSelector((state) => state.WishlistReducer.isAdding);
  const [addingID, setAddingID] = useState(null);

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  const handleAddToWishlist = () => {
    if (
      typeof userData !== "undefined" &&
      userData !== null &&
      userData !== ""
    ) {
      setAddingID(id);
      dispatch(addToWishlistAction(id));
    } else {
      dispatch(toggleModal());
    }
  };

  useEffect(() => {
    if (!isAdding) {
      setAddingID(null);
    }
  }, [isAdding]);

  return addingID !== null && addingID === id && isAdding === true ? (
    <SmallLoading />
  ) : (
    <div
      className="add_to_wishlist pointer"
      onClick={() => handleAddToWishlist()}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="heart"
        className="svg-inline--fa fa-heart fa-w-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
      </svg>
    </div>
  );
};

export default AddToWishlist;
