import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addToCartAction, updateCartQtyAction } from "../_redux/action/CartAction";
 
const CartQuantityForDetails = ({ cart, item }) => {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0)

    const updateQuantity = (quantity) => {
        if (typeof cart !== "undefined" && cart !== null && cart !== "") {
            setQuantity(quantity);
            dispatch(updateCartQtyAction(cart.productID, quantity));
        }else {
            setQuantity(quantity);
            dispatch(addToCartAction(item, {quantity}))
        }

    }

    useEffect(() => {
        if (typeof cart !== "undefined" && cart !== null && cart !== "") {
            setQuantity(cart.quantity)
        } else {
            setQuantity(quantity);
        }
    }, [cart]);

    return (

        <div className="price-increase-decrese-group d-flex">
            <span className="decrease-btn">
                <button type="button" className="btn quantity-left-minus pointer" data-type="minus" data-field="" disabled={quantity === 0? true:false} onClick={() => updateQuantity(quantity - 1)}> -
                </button>
            </span>
            <input
                type="text"
                name="quantity"
                className="form-controls input-number"
                value={quantity}
            />
            <span className="increase" onClick={() => updateQuantity(quantity + 1)}>
                <button type="button" className="btn quantity-right-plus" data-type="plus" data-field="">+
                </button>
            </span>
        </div>
    );
}

export default CartQuantityForDetails;