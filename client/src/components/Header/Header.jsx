import React, { useEffect } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import axios from "axios";

const Header = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  const history = useHistory();

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
  }, [user]);

  const handleAuth = () => {
    if (user.data !== "") {
      axios
        .get("/api/logout")
        .then(() => {
          console.log("Logging out...");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="header">
      {/* LOGO */}
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>

      {/* SEARCH */}
      <div className="header-search">
        <input className="header-searchInput" type="text" />
        <SearchIcon className="header-searchIcon" />
      </div>

      {/* HEADER NAV */}
      <div className="header-nav">
        <div onClick={handleAuth} className="header-option">
          <span className="header-option1">
            Hello,{" "}
            {user?.data !== "" || user === null ? user?.data.email : "User"}
          </span>
          <span className="header-option2">
            {user?.data !== "" || user === null ? "Sign Out" : "Sign In"}
          </span>
        </div>
        <div className="header-option">
          <span className="header-option1">Returns</span>
          <span className="header-option2">& Orders</span>
        </div>
        <div className="header-option">
          <span className="header-option1">Your</span>
          <span className="header-option2">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header-optionBasket">
            <ShoppingCartIcon />
            <span className="header-option2 header-basketCount">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
