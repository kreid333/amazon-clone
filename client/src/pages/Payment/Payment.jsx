import React, { useEffect, useState } from "react";
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../utils/StateProvider";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "axios";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  const [total, setTotal] = useState(0);

  const history = useHistory();

  console.log(user);

  // STATES FOR STRIPE PAYMENT PROCESSING
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisbaled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // CHANGING CART LENGTH WHEN ITEMS ARE REMOVED FROM CART
    const prices = [];

    for (let i = 0; i < cart.length; i++) {
      prices.push(cart[i].price);
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (prices.length !== 0) {
      let totalPrice = prices.reduce(reducer);
      setTotal(totalPrice);

      // GENERATE THE CLIENT SECRET THAT ALLOWS US TO CHARGE A CUSTOMER
      const getClientSecret = async () => {
        const paymentTotal = Math.round(totalPrice * 100);
        const response = await axios.post(
          `/payments/create?total=${paymentTotal}`
        );
        setClientSecret(response.data.clientSecret);
      };

      getClientSecret();
    }
  }, [cart]);

  // console.log(`THE SECRET IS ${clientSecret}`);

  // HANDLING SUBMISSION OF PAYMENT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // CONFIRMING CARD PAYMENT WITH SECRET AND DEFINING PAYMENT METHOD
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // PAYMENT INTENT = PAYMENT CONFIRMATION
        axios
          .get("/api/user")
          .then((response) => {
            axios
              .post("/orders", {
                user: response.data.id ? response.data.id : null,
                cart: cart,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
              })
              .then(() => {
                console.log("Successfully created order");
              })
              .catch((err) => {
                if (err) {
                  console.log(err);
                }
              });
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        // SWAPS PAGE INSTEAD OF PUSHING IT INTO HISTORY
        history.replace("/orders");
      });
  };

  // HANADLING CHANGE OF CARD INPUT
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
                      <h4>Order Total: {value}</h4>
                    </>
                  )}
                  decimalScale={2}
                  value={total}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
