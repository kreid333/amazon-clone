import React, { useEffect, useState } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../utils/StateProvider";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
  const [{ cart }, dispatch] = useStateValue();

  const [total, setTotal] = useState(0);

  const history = useHistory();

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

  const proceedToCheckout = () => {
    if (cart.length > 0) {
      history.push("/payment");
    } else {
      alert("There are no items in your cart to checkout!");
    }
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={total}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
      <button onClick={proceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
