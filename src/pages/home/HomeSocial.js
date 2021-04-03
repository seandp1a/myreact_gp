import React from 'react'
import Slider from 'react-slick'
import './social.scss'
import { Link } from 'react-router-dom'

function HomeSocial(props) {
  const settings = {
    //auto play
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    // beforeChange: function (currentSlide, nextSlide) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    // afterChange: function (currentSlide) {
    //   console.log("after change", currentSlide);
    // },
  }

  return (
    <>
      <div className="container">
        <div className="social-container mb-5">
          <div className="social-txt d-block">
            <div className="social-content">
              <h1>
                <span>MY</span> <br />
                SOCIAL
                <br />
                MEDIA
              </h1>
              <p>分享屬於你的時尚風格</p>
              <p className="hastag">#我們都在用JU4T</p>
              <span>Share Your Style</span>
              <Link to="/social">
                <button className="btn important-btn md circle">
                  <span>→</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="social-img">
            <div className="social-slide-left">
              <Slider {...settings}>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/1.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/2.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/3.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/4.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/5.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/6.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/7.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/8.png`} alt="" />
                </div>
              </Slider>
            </div>
            <div className="social-slide-right">
              <Slider {...settings}>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/9.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/10.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/11.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/12.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/13.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/14.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/15.png`} alt="" />
                </div>
                <div className="social-slide">
                  <img src={`./${props.myurl}img/home/16.png`} alt="" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomeSocial
