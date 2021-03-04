import React, { useEffect, useState } from "react";
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../utils/StateProvider";
import "./Payment.css";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  const [total, setTotal] = useState(0);

  const [error, setError] = useState(null);
  const [disabled, setDisbaled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const prices = [];

    for (let i = 0; i < cart.length; i++) {
      prices.push(cart[i].price);
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (prices.length !== 0) {
      const totalPrice = prices.reduce(reducer);
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const handleSubmit = () => {
    // stripe stuff
  };

  const handleChange = (e) => {
    setDisbaled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{cart?.length} items</Link>)
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.data.email}</p>
            <p>123 React Lane</p>
            <p>Savannah, GA 31409</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {cart.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={total}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
