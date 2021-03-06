import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../../utils/StateProvider";
import Order from "../../components/Order/Order";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ cart, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      axios.get("/api/user").then((response) => {
        axios.get(`/orders/${response.data.id}`).then((data) => {
          setOrders(data.data.orders);
        });
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
