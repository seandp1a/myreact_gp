import React from 'react'
import { Link } from 'react-router-dom'

class HomeProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    // this.myurl = this.myurl(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  // 要記得移除scroll事件，不然會吃效能
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    // console.warn('the scroll things', event)
    // (console.warn('scrollTop的距離',document.documentElement.scrollTop))

    // 獲取className為productcontainer的div
    const getDiv = document.getElementsByClassName('productcontainer')[0]
    // console.warn('獲得div',document.getElementsByClassName('productcontainer'));

    // 獲取className為productcontainer的div距離body的高度
    const getPosition = getDiv.offsetTop
    // console.warn('獲得Product-div距離上方高度',getDiv.offsetTop);

    const scrollTop = event.srcElement
      ? event.srcElement.documentElement.scrollTop
      : false
    if (scrollTop <= getPosition) {
      // querySelectorAll會將要找的box回傳成一個陣列，利用for迴圈改變找到的所有box裡面的東西
      const animation1 = document.querySelectorAll('.box')
      for (var i = 0; i < animation1.length; i++) {
        var openBox = animation1[i]
        openBox.classList.remove('box-animation')
      }

      const animation2 = document.querySelectorAll('.product-img')
      for (var i = 0; i < animation2.length; i++) {
        var fadeImg = animation2[i]
        fadeImg.classList.remove('product-img-animation')
      }

      const animation3 = document.querySelectorAll('.product-disc')
      for (var i = 0; i < animation3.length; i++) {
        var showDisc = animation3[i]
        showDisc.classList.remove('product-disc-animation')
      }

      const animation4 = document.querySelectorAll('.product-disc-content')
      for (var i = 0; i < animation4.length; i++) {
        var fadeContent = animation4[i]
        fadeContent.classList.remove('product-disc-content-animation')
      }

      const animation5 = document.querySelectorAll('.buy')
      for (var i = 0; i < animation5.length; i++) {
        var fadeBuy = animation5[i]
        fadeBuy.classList.remove('buy-animation')
      }

      // querySelector只會改變找到的第一個元素
      {
        // const openBox = document.querySelector('.box')
        // openBox.classList.remove("box-animation")
      }
    } else if (scrollTop >= getPosition) {
      // querySelectorAll會將要找的box回傳成一個陣列，利用for迴圈改變找到的所有box裡面的東西
      const animation1 = document.querySelectorAll('.box')
      for (var i = 0; i < animation1.length; i++) {
        var openBox = animation1[i]
        openBox.classList.add('box-animation')
      }

      const animation2 = document.querySelectorAll('.product-img')
      for (var i = 0; i < animation2.length; i++) {
        var fadeImg = animation2[i]
        fadeImg.classList.add('product-img-animation')
      }

      const animation3 = document.querySelectorAll('.product-disc')
      for (var i = 0; i < animation3.length; i++) {
        var showDisc = animation3[i]
        showDisc.classList.add('product-disc-animation')
      }

      const animation4 = document.querySelectorAll('.product-disc-content')
      for (var i = 0; i < animation4.length; i++) {
        var fadeContent = animation4[i]
        fadeContent.classList.add('product-disc-content-animation')
      }

      const animation5 = document.querySelectorAll('.buy')
      for (var i = 0; i < animation5.length; i++) {
        var fadeBuy = animation5[i]
        fadeBuy.classList.add('buy-animation')
      }

      // querySelector只會改變找到的第一個元素
      {
        // const openBox = document.querySelector(".box")
        // openBox.classList.add("box-animation")
      }
    }
  }

  render() {
    return (
      <>
        <div className="productcontainer product1">
          <div className="box">
            <div className="product-img">
              <img src={`./${this.props.myurl}img/home/product01.jpg`} alt="" />
            </div>

            <div className="product-disc">
              <div className="product-disc-content">
                <div className="disc-content-about">
                  <h1>獨家設計專區</h1>
                  <span>
                    超過百種風格設計
                    <br />
                    讓你放膽搭配
                  </span>
                  <div className="product-buttons">
                    <Link to="/products?phone=iPhone-12">
                      <button className="btn buy">前往選購</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="productcontainer product2">
          <div className="box">
            <div className="product-img">
              <img src={`./${this.props.myurl}img/home/product02.jpg`} alt="" />
            </div>

            <div className="product-disc disc-color2">
              <div className="product-disc-content">
                <div className="disc-content-about">
                  <h1>聯名設計專區</h1>
                  <span>
                    正版插畫聯名款
                    <br />
                    讓你自由選擇
                  </span>
                  <div className="product-buttons">
                    <Link to="/products?phone=iPhone-12">
                      <button className="btn buy buy2">前往選購</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default HomeProduct
