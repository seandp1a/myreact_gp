import React from "react";
import { Link } from "react-router-dom";

const ProductsBanner = () => {
  return (
    <div className="products-banner-block position-relative d-flex justify-content-center">
      <h1 className="position-absolute text-white">
        想要自行客製化?<span>來嘗試我們的</span>
      </h1>
      <img
        className="img-fluid"
        src="./img/products/products-banner.jpg"
        alt="products banner"
      />

      <Link to="/customize/step-one" className="position-absolute">
        <button className="btn important-btn md">客製化工作室</button>
      </Link>
    </div>
  );
};

export default ProductsBanner;
