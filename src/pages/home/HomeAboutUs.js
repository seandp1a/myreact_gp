import React from 'react'

function HomeAboutUs(props) {
  return (
    <>
      <div className="aboutus position-relative">
        <div className="container">
          <div className="aboutus-txt position-absolute">
            <h1>Just for safety</h1>
            <p>
              追求創新的材質與技術，結合有趣的想法和創意
              <br />
              研發出讓人眼睛為之一亮的超酷商品。
            </p>
            <span>Who We Are</span>

            <button className="btn primary-btn md circle">
              <span>→</span>
            </button>
          </div>
        </div>
        <div className="aboutus-bg">
          <img src={`./${props.myurl}img/home/aboutus-bg.png`} alt="" />
        </div>
        <div className="aboutus-bg-mobile">
          <img src={`./${props.myurl}img/home/aboutus-bg-mobile.png`} alt="" />
        </div>
      </div>
    </>
  )
}
export default HomeAboutUs
