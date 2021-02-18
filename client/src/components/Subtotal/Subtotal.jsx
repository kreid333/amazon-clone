import React, { useEffect, useState } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../utils/StateProvider";

const Subtotal = () => {
  const [{ cart }, dispatch] = useStateValue();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const prices = [];

    for (let i = 0; i < cart.length; i++) {
      prices.push(cart[i].price);
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (prices.length !== 0) {
      const totalPrice = prices.reduce(reducer);
      setTotal(totalPrice);
    }
  }, []);

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
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
