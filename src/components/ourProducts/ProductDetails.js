import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "./_redux/Action/OurProductAction";
 import { SideBySideMagnifier } from "react-image-magnifiers";
import ReactImageZoom from "react-image-zoom";
import { useHistory } from "react-router-dom";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import CartQuantity from "../cart/partials/CartQuantity";
import PriceCalculation from "../master/services/PriceCalculcation";
import SimpleButton from "../master/simpleButton/SimpleButton";
import { Link } from "react-router-dom";
import {
  addToCartAction,
  getCartsAction,
} from "../cart/_redux/action/CartAction";
import CartQuantityForDetails from "../cart/partials/CartQuantityForDetails";
import AddToWishlist from "../wishlist/AddToWishlist";
import { showToast } from "./../master/Helper/Notification";

const ProductDetails = ({ product,id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productDetails = useSelector(
    (state) => state.OurProductReducer.productDetails
  );
  const loadingDetails = useSelector(
    (state) => state.OurProductReducer.loadingDetails
  );
  const carts = useSelector((state) => state.CartReducer.carts);
  const cartQuantity = useSelector((state) => state.CartReducer.cartQuantity);

  const [prevImg, setPrevImg] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [filterCarts, setFilterCarts] = useState(null);

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getCartsAction());
  }, []);

  useEffect(() => {
    if (productDetails !== null && productDetails !== "") {
      setPrevImg(productDetails.image);
    }
  }, [productDetails]);

  const zoomImg = {
    width: 500,
    height: 300,
    zoomWidth: 500,
    zoomPosition: "original",
    img: prevImg,
  };

  useEffect(() => {
    if (productDetails) {
      const newFilterCarts = carts.find(
        (item) => item.productID == productDetails.id
      );
      setFilterCarts(newFilterCarts);
      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.quantity);
        setQuantity(newFilterCarts.quantity);
      }
    }
  }, [loadingDetails, carts, quantity]);

  const addToCart = () => {
     dispatch(addToCartAction(product));
    // if (
    //   typeof carts !== "undefined" &&
    //   carts !== null &&
    //   carts !== "" &&
    //   carts.length > 0
    // ) {
      history.push("/checkout");
    // } else {
    //   showToast("error", "Please update your cart first!");
    // }
  };


  return (
    <section className="product_details_area p-3">
      {typeof productDetails !== "undefined" &&
        productDetails !== null &&
        productDetails !== "" && (
          <div className="row">
            <div className="col-lg-6 product_details_left position-relative">
              <span className="product_details_batch">30%</span>
              <div className="product_details_prev_img">
                {prevImg !== null && (
                  <>
                    <SideBySideMagnifier
                      imageSrc={prevImg}
                      imageAlt={productDetails.name}
                      className="product_prev_img"
                      alwaysInPlace={true}
                    />
                    <ReactImageZoom {...zoomImg} />
                  </>
                )}
                {/* <div className="product_details_img_gallery">
                                    <img src={productDetails.image} alt={productDetails.name} />
                                </div> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-details-content">
                {/* <Link className="wish-link" to={``}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                                    </svg>
                                </Link> */}
                <div className="wish_list_add">
                  <AddToWishlist id={productDetails.id} />
                </div>
                <a href="/" className="cata">
                  Catagory
                </a>
                <h2>{productDetails.name}</h2>
                {/* <p className="quantity">1kg</p> */}
                <h3 className="price">
                  <PriceCalculation
                    item={productDetails}
                    style={{ fontSize: "24px" }}
                  />
                </h3>

                <CartQuantityForDetails
                  item={productDetails}
                  cart={filterCarts}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />

                <p>
                  {productDetails.full_description}
                </p>

                <div
                  className="d-flex justify-content-end"
                  onClick={() => addToCart()}
                >
                  {/* <a href="/" class="buy-now">Buy Now</a> */}
                  <SimpleButton
                    text="Buy Now"
                    style={{ padding: "5px 20px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      {loadingDetails === true && (
        <SimpleLoading type="spokes" color="#1c733e" />
      )}
    </section>
  );
};

export default ProductDetails;
