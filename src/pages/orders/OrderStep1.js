import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { increment, decrement } from '../../actions/bagCounterAction'
import Cookies from 'js-cookie'

import OrderStep0 from './OrderStep0'
import Notlog from './NotLog'
import S1DoLog from './S1DoLog'
import OrderBread from './OrderBread'

import './order-content.scss'
function OrderStep1(props) {
  const icon_cross = '<use xlink:href="#cart-cross"></use>'
  const icon_minus = '<use xlink:href="#count-minus"></use>'
  const icon_add = '<use xlink:href="#count-add"></use>'

  // REDUX使用 ▼
  const dispatch = useDispatch()

  const {
    cartList,
    setCartList,
    orderDetail,
    setOrderDetail,
    memberData,
    orderDetail2,
    setOrderDetail2,
    myAlert,
  } = props

  let isLog
  isLog = memberData.id ? 'y' : 'n'

  useEffect(() => {}, [cartList])

  // 購物車數量 input控制 ▼
  const HandleAmount = (index, item, e) => {
    const newList = [...cartList]
    // 取得新數量
    const newAmount = !e.target.value.trim() ? '0' : e.target.value.trim()
    newList[index].quantity = newAmount
    setCartList(newList)
  }

  // 購物車按鈕控制(新增、減少、刪除) ▼
  const Add_Minus = (index, event) => {
    let newList = [...cartList]
    if (event === 'add')
      newList[index].quantity = (+newList[index].quantity + 1).toString()
    if (event === 'minus') {
      newList[index].quantity =
        newList[index].quantity === '0'
          ? '0'
          : (+newList[index].quantity + -1).toString()
    }
    if (event === 'del') {
      document.querySelector(`#cart-item${index}`).style.opacity = 0
      newList = newList.filter((item, i) => i !== index)
    }
    if (event === 'del-fetch') {
      document.querySelector(`#cart-item${index}`).style.opacity = 0
      newList = newList.filter((item, i) => i !== index)
      let oldToken = Cookies.get('cart_products')
      const token = JSON.parse(oldToken)
      if (token.length === 1) {
        Cookies.remove('cart_products')
      } else {
        Cookies.set('cart_products', newList, { expires: 1 })
      }

      dispatch(decrement())

      //
    }
    setTimeout(() => {
      setCartList(newList)
      // document.querySelector(`.cart-div .d-flex`).style.opacity = 0;
      const allCart = document.querySelectorAll('.carts')
      for (let i = 0; i < allCart.length; i++) {
        allCart[i].style.opacity = 1
      }
    }, 500)
  }

  const [storeData, setStoreData] = useState()
  const [cityList, setCityList] = useState()

  const getStore = () => {
    fetch('http://localhost:3000/myreact_gp/data/storeData.json')
      .then((response) => response.json())
      .then((data) => {
        setStoreData(data[0])
        setCityList(Object.keys(data[0]))
      })
  }

  useEffect(() => {
    getStore()
  }, [])

  return (
    <>
      <Container className="order-content">
        <OrderBread />

        {/* 判斷順序 -> 購物車是否有東西 -> 是否已登入 */}
        {!cartList ? (
          <OrderStep0 />
        ) : isLog === 'y' ? (
          <S1DoLog
            icon_cross={icon_cross}
            icon_add={icon_add}
            icon_minus={icon_minus}
            cartList={cartList}
            setCartList={setCartList}
            HandleAmount={HandleAmount}
            Add_Minus={Add_Minus}
            setOrderDetail={setOrderDetail}
            orderDetail={orderDetail}
            memberData={memberData}
            orderDetail2={orderDetail2}
            setOrderDetail2={setOrderDetail2}
            myAlert={myAlert}
            storeData={storeData}
            cityList={cityList}
          />
        ) : (
          <Notlog
            icon_cross={icon_cross}
            cartList={cartList}
            setCartList={setCartList}
            Add_Minus={Add_Minus}
          />
        )}
      </Container>

      <svg display="none">
        <symbol
          id="count-add"
          viewBox="0 0 14.84 14.84"
          width="15"
          height="15"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        >
          <path className="cls-1" d="M14.09,7.42H.75m6.67,6.67V.75" />
        </symbol>
        <symbol
          id="count-minus"
          viewBox="0 0 13.17 1.5"
          width="15"
          height="15"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        >
          <path
            id="ic-actions-remove-simple"
            className="cls-1"
            d="M12.42.75H.75"
          />
        </symbol>
        <symbol
          id="cart-cross"
          viewBox="0 0 21.89 21.64"
          fill="none"
          stroke="#ff3a3a"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        >
          <path
            id="ic-actions-close-simple"
            className="cls-1"
            d="M20.89,20.89.75.75m20.39,0L1,20.89"
          />
        </symbol>
      </svg>
    </>
  )
}
export default OrderStep1
