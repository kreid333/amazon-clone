import React from "react";
import { useStateValue } from "../../utils/StateProvider";
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import Subtotal from "../../components/Subtotal/Subtotal";
import "./Checkout.css";

const Checkout = () => {
  const [{ cart }, dispatch] = useStateValue();
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
        {cart.map((item) => (
          <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating}/>
        ))}
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
