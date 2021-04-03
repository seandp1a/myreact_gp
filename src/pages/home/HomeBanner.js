import React from "react";
import { Link } from "react-router-dom";

function HomeBanner() {

    return (
        <>
            <div className="banner position-relative" id="test">
                <div className="hero-img-txt text-center position-absolute">
                    <div data-aos="fade-down" data-aos-duration="3000">
                    <h1 >玩美保護</h1>
                    <p className="" >誰說美型與保護力只能選一？</p>

                    <Link to="/products?phone=iPhone-12">
                    <button className="btn important-btn md" > 了解更多</button>
                    </Link>
                    </div>

                </div>
                <div className="hero-img" data-aos="fade-up" data-aos-duration="3000" data-aos-delay="300">
                    <img src="./img/home/hero-img.png"alt=""/>
                </div>
                <div className="hero-img-mobile">
                    <img src="./img/home/hero-img-mobile.jpg" alt=""/>
                </div>
            </div>
        </>
    );
}
export default HomeBanner;