import React from "react";
import Subtotal from "../Subtotal/Subtotal";
import "./Checkout.css";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h2 className="checkout-title">Your Shopping Cart</h2>
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
