import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { updateCartQtyAction } from "../_redux/action/CartAction";
  
const CartQuantity = ({ cart, isUpgrade }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(0);

    const updateQuantity = (qty) => {
        setQty(qty);
        dispatch(updateCartQtyAction(cart.product_id, qty));
    }

    useEffect(() => {
        if (typeof cart !== "undefined" && cart !== null) {
            setQty(cart.qty)
        } else {
            setQty(0);
        }
    }, [cart])

    return (

        <div className="price-increase-decrese-group d-flex">
            <span className="decrease-btn">
                <button
                    type="button"
                    className="btn quantity-left-minus"
                    data-type="minus" data-field=""
                    onClick={() => updateQuantity(qty - 1)}
                    // disabled={isUpgrade === false ? true : false}
                > -
                </button>
            </span>
            <input
                type="text"
                name="quantity"
                className="form-controls input-number"
                value={qty}
            // onChange={e => updateQuantity(e.target.value)}
            />
            <span className="increase">
                <button
                    type="button"
                    className="btn quantity-right-plus"
                    data-type="plus" data-field=""
                    onClick={() => updateQuantity(qty + 1)}
                    // disabled={isUpgrade === false ? true : false}
                >+
                </button>
            </span>
        </div>
    );
}

export default CartQuantity;