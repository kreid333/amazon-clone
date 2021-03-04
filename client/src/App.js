import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./utils/StateProvider";
import Payment from "./pages/Payment/Payment";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        if (response.data !== "" || response.data.length === 0) {
          // DISPATCHING USER TO CONTEXT API USING INFORMATION FROM '/api/user' GET REQUEST
          dispatch({
            type: "SET_USER",
            user: response,
          });
        } else {
          // SETS USER TO NULL IN CONTEXT API IF NO USER IS LOGGED IN
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payment" component={Payment} />
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
