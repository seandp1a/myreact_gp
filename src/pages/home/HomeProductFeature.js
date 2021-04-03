import React from 'react'
// import {Button} from "react-bootstrap";

function HomeProductFeature(props) {
  return (
    <>
      <div className="product-feature">
        <div className="feature-container">
          <div className="card">
            <img src={`./${props.myurl}img/home/01.jpg`} alt="" />
            <div className="card__head">Drop Test</div>
            <div className="card__head_detail">
              <p>軍規等級防摔測試</p>
              高強度玻璃背板
              <br />
              內側方格增加緩衝力
              <br />
              耐摔強度大幅提升
              <br />
            </div>
          </div>
          <div className="card">
            <img src={`./${props.myurl}img/home/02.jpg`} alt="" />
            <div className="card__head">Glasses</div>
            <div className="card__head_detail">
              <p>玻璃背板塗層再進化</p>
              表面處理等離子疏由疏水
              <br />
              指紋輕易擦拭耐髒汙
              <br />
            </div>
          </div>
          <div className="card">
            <img src={`./${props.myurl}img/home/03.jpg`} alt="" />
            <div className="card__head">Clean</div>
            <div className="card__head_detail">
              <p>抗汙耐髒好清潔</p>
              日常污漬都能輕鬆清除
              <br />
              輕輕擦拭還原如新
              <br />
            </div>
          </div>
          <div className="card">
            <img src={`./${props.myurl}img/home/04.jpg`} alt="" />
            <div className="card__head">Better For You</div>
            <div className="card__head_detail">
              <p>食品級矽膠材質</p>
              邊框表面具備止滑性、易於清潔、無毒認證
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomeProductFeature
