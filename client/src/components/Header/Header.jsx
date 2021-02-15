import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Header = () => {
  return (
    <div className="header">
      {/* LOGO */}
      <img
        className="header-logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="Amazon Logo"
      />

      {/* SEARCH */}
      <div className="header-search">
        <input className="header-searchInput" type="text" />
        <SearchIcon className="header-searchIcon" />
      </div>

      {/* HEADER NAV */}
      <div className="header-nav">
        <div className="header-option">
          <span className="header-option1">Hello, User</span>
          <span className="header-option2">Sign In</span>
        </div>
        <div className="header-option">
          <span className="header-option1">Returns</span>
          <span className="header-option2">& Orders</span>
        </div>
        <div className="header-option">
          <span className="header-option1">Your</span>
          <span className="header-option2">Prime</span>
        </div>
        <div className="header-optionBasket">
          <ShoppingCartIcon />
          <span className="header-option2 header-basketCount">0</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
