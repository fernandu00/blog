import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header-titles">
        <span className="header-title-sm">A Little bit of Everything!</span>
        <span className="header-title-lg">Blog</span>
      </div>
      <img
        className="header-img"
        src="https://images.unsplash.com/photo-1664903343798-fc4dc8988880?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
        alt="img"
      />
    </div>
  );
};

export default Header;
