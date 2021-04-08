import { Container, Modal } from 'react-bootstrap'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { CLEARBAG } from '../../actions/bagCounterAction'

import CartCheck from './cartlist/CartCheck'
import OrderBread from './OrderBread'
import './order-content.scss'
import moment from 'moment'

function OrderStep3(props) {
  const dispatch = useDispatch()

  const {
    cartList,
    orderDetail,
    memberData,
    orderDetail2,
    setOrderDetail,
  } = props

  const disnum = orderDetail.discount
  const discountList = {
    1: '0%',
    0.9: '10%',
    0.8: '20%',
    0.7: '30%',
  }

  const [payway, setPayway] = useState('信用卡')
  const [cardNum1, setCardNum1] = useState('')
  const [cardNum2, setCardNum2] = useState('')
  const [cardNum3, setCardNum3] = useState('')
  const [cardNum4, setCardNum4] = useState('')
  const [cardMonth, setCardMonth] = useState('')
  const [cardDate, setCardDate] = useState('')
  const [sNum, setSNum] = useState('')

  //MODAL 顯示控制
  const [show, setShow] = useState(false)
  const [creditCardShow, setCreditCardShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    setTimeout(() => {
      props.history.push('/')
    }, 500)
  }
  const handleShow = () => setShow(true)

  const handleCShow = () => setCreditCardShow(true)
  const handleCClose = () => setCreditCardShow(false)

  const HandleCheckout = () => {
    const OrderList = JSON.parse(localStorage.getItem('OrderList'))
    const OrderDetail = JSON.parse(localStorage.getItem('OrderDetail'))
    const OrderID = Math.floor(Date.now() / 1000)
    const newOL = {
      member_id: memberData.id,
      price: Math.round(orderDetail.Tprice * orderDetail.discount),
      payway: orderDetail.payWay,
      getWay: orderDetail.getWay,
      address: orderDetail2.address,
      store: orderDetail2.store,
      taker: orderDetail2.name,
      taker_phone: orderDetail2.phone,
      status: '1',
      discount: orderDetail.discount,
      receipt: orderDetail.receipt,
      created_at: moment(new Date()).format('yyyy-MM-dd HH:mm:ss'),
      unique_id: OrderID,
    }
    const newOD = cartList.map((v) => {
      let temp = {
        order_id: OrderID,
        model_Name: v.phoneModel,
        shell_id: v.shell_id,
        series_id: v.series_id,
        design_id: v.design_id,
        per_price: v.price,
        quantity: v.quantity,
        phoneColor: v.phoneColor,
      }
      return temp
    })
    console.log('newOL', newOL)
    console.log('newOD', newOD)

    let tempL = OrderList ? [...OrderList] : []
    tempL.push(newOL)

    let tempD = OrderDetail ? [...OrderDetail] : []
    newOD.forEach((v) => {
      tempD.push(v)
    })

    localStorage.setItem('OrderList', JSON.stringify(tempL))
    localStorage.setItem('OrderDetail', JSON.stringify(tempD))

    Cookies.remove('cart_products')
    dispatch(CLEARBAG())
    handleShow()
  }

  //黑貓宅配的情況下，付款方式的選擇連動改變 OrderDetail 的 payWay
  useEffect(() => {
    const temp = { ...orderDetail }
    if (temp.getWay === '黑貓宅配') temp.payWay = payway
    setOrderDetail(temp)
  }, [payway])

  const N1 = useRef()
  const N2 = useRef()
  const N3 = useRef()
  const N4 = useRef()

  useEffect(() => {
    if (creditCardShow) {
      N1.current.focus()
      if (cardNum1.length === 4) {
        N2.current.focus()
        if (cardNum2.length === 4) {
          N3.current.focus()
          if (cardNum3.length === 4) {
            N4.current.focus()
          }
        }
      }
    }
  }, [creditCardShow, cardNum1, cardNum2, cardNum3, cardNum4])

  if (!orderDetail.setted) {
    return <Redirect to="/order/step1"></Redirect>
  }
  function flip(e) {
    if (e.currentTarget.classList.contains('flip')) {
      e.currentTarget.classList.remove('flip')
      setTimeout(() => {
        document.querySelector('.C1').classList.add('C-Back')
        document.querySelector('.C1').classList.remove('C-Front')
        document.querySelector('.C2').classList.add('C-Front')
        document.querySelector('.C2').classList.remove('C-Back')
      }, 150)
    } else {
      e.currentTarget.classList.add('flip')
      setTimeout(() => {
        document.querySelector('.C1').classList.add('C-Front')
        document.querySelector('.C1').classList.remove('C-Back')
        document.querySelector('.C2').classList.add('C-Back')
        document.querySelector('.C2').classList.remove('C-Front')
      }, 150)
    }
  }
  return (
    <>
      <Container className="order-content">
        <OrderBread />
        <div className="order-step-banner mt-2 mb-5">
          <img
            src="/myreact_gp/img/orders/B_STEP3.svg"
            className="mx-auto"
            alt=""
          />
        </div>

        <div className="d-flex align-items-end">
          <h1 className="col-6 pl-0 text-left mb-0">您的購物車</h1>
          <h2 className="col-2 text-left mb-0">金額</h2>
          <h2 className="col-1 mb-0">&nbsp;</h2>
          <h2 className="col-3 text-center mb-0">合計</h2>
        </div>
        <hr className="myhr1" />

        <div className="d-flex flex-column cart-div">
          {cartList ? (
            cartList.map((v, i) => {
              return <CartCheck key={i} v={v} i={i}></CartCheck>
            })
          ) : (
            <Redirect to="/order/step1" />
          )}
        </div>
        <hr className="myhr2" />
        <form hidden id="final">
          <input type="number" name="member_id" defaultValue={memberData.id} />
          <input
            type="number"
            name="price"
            defaultValue={Math.round(orderDetail.Tprice * orderDetail.discount)}
          />
          <input type="text" name="payway" defaultValue={orderDetail.payWay} />
          <input type="text" name="getway" defaultValue={orderDetail.getWay} />
          <input
            type="text"
            name="address"
            defaultValue={orderDetail2.address}
          />
          <input type="text" name="store" defaultValue={orderDetail2.store} />
          <input type="text" name="taker" defaultValue={orderDetail2.name} />
          <input
            type="text"
            name="taker_phone"
            defaultValue={orderDetail2.phone}
          />
          <input type="text" name="status" defaultValue="1" />
          <input
            type="text"
            name="discount"
            defaultValue={orderDetail.discount}
          />
          <input
            type="text"
            name="receipt"
            defaultValue={orderDetail.receipt}
          />
          {cartList.map((v, i) => {
            return (
              <input
                key={i}
                type="text"
                name={`item${i}`}
                defaultValue={[
                  v.phoneModel,
                  v.shell_id,
                  v.series_id,
                  v.design_id,
                  v.price,
                  v.quantity,
                  v.phoneColor,
                  v.file_name,
                ]}
              />
            )
          })}
        </form>
        <div className="d-flex justify-content-end my-4">
          <div className="d-flex flex-column align-items-end mt-3 order-cost-detail">
            <div className="d-flex align-items-center primary-text">
              <img src="/myreact_gp/img/orders/order-cuppon-icon.svg" alt="" />
              <h3 className="mb-0">{discountList[disnum]} OFF</h3>
            </div>
            <hr className="calc-hr my-2" />
            <div className="d-flex w-100 mt-2">
              <h3>小計</h3>
              <h3 className="ml-auto">$ &nbsp;{orderDetail.Tprice} TWD</h3>
            </div>
            <div className="d-flex w-100 my-2">
              <h3>運費</h3>
              <h3 className="ml-auto">免費</h3>
            </div>
            <div className="d-flex w-100 mt-2">
              <h3>折扣</h3>
              <h3 className="danger-text ml-auto">
                -$ &nbsp;
                {Math.round(orderDetail.Tprice * (1 - orderDetail.discount))}
                TWD
              </h3>
            </div>

            <hr className="calc-hr my-2" />

            <div className="d-flex w-100 mt-2">
              <h1>總計</h1>
              <h1 className="ml-auto">
                $ &nbsp;{Math.round(orderDetail.Tprice * orderDetail.discount)}{' '}
                TWD
              </h1>
            </div>
          </div>
        </div>

        <hr className="stephr v3" />
        <form className="order-final-check ">
          <h1 className="text-center">JUST 賈斯特</h1>

          <div className="box d-flex flex-column col-6 mx-auto">
            <div className="d-flex">
              <div className="col-2">聯絡</div>
              <div className="col-8">{memberData.email}</div>
              <div className="col-2 text-right">
                <Link to="/order/step1/step2" className="order-last-step">
                  變更
                </Link>
              </div>
            </div>
            <hr className="calc-hr" />
            <div className="d-flex">
              <div className="col-2">收貨地</div>
              <div className="col-8 ">
                {orderDetail.getWay === '超商取貨'
                  ? `7-ELEVEN ${orderDetail2.block}${orderDetail2.store}店, ${orderDetail2.address}, 7-ELEVEN ${orderDetail2.city} , 台灣`
                  : orderDetail2.address + ',' + orderDetail2.city + ',台灣'}
              </div>
              <div className="col-2 text-right">
                <Link to="/order/step1" className="order-last-step">
                  變更
                </Link>
              </div>
            </div>
            <hr className="calc-hr" />
            <div className="d-flex">
              <div className="col-2">
                {orderDetail.getWay === '超商取貨' ? '付款方式' : '收件方式'}
              </div>
              <div className="col-8">
                {orderDetail.getWay === '超商取貨'
                  ? '7-ELEVEN便利商店貨到付款 · 免運費'
                  : '黑貓宅急便(不含部分離島地區，請詳見常見問題) · 免運費'}
              </div>
              <div className="col-2 text-right">
                <Link to="/order/step1/" className="order-last-step">
                  變更
                </Link>
              </div>
            </div>
          </div>
          {orderDetail.getWay === '超商取貨' ? (
            <h3 className="text-center">
              每筆交易都經過先進加密技術處理，受到嚴密的保護。
            </h3>
          ) : (
            <>
              <div className="col-6 mx-auto">
                <h2>選擇付款方式</h2>
                <h3 className="my-3">
                  每筆交易都經過先進加密技術處理，受到嚴密的保護。
                </h3>
              </div>
              <div className="box d-flex flex-column col-6 mx-auto">
                <div className="d-flex myradio">
                  <input
                    id="radio1"
                    className="form-check-input"
                    type="radio"
                    value="信用卡"
                    checked={payway === '信用卡'}
                    onChange={(e) => {
                      setPayway(e.target.value)
                    }}
                  />
                  <label className="form-check-label" htmlFor="radio1">
                    信用卡/Credit card (HiTRUSTpay)
                  </label>
                  <div className="row ml-auto">
                    <img src="/myreact_gp/img/orders/visa.svg" alt="" />
                    <img src="/myreact_gp/img/orders/master.svg" alt="" />
                    <img src="/myreact_gp/img/orders/jcb.svg" alt="" />
                    <img src="/myreact_gp/img/orders/google_pay.svg" alt="" />
                  </div>
                </div>
                {payway === '信用卡' ? (
                  <>
                    <hr className="calc-hr" />
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src="/myreact_gp/img/orders/offsite.svg"
                        className="my-4"
                        alt=""
                      />
                      <h4 className="text-center">
                        "完成結帳"，頁面將會自動引導至有安全認證的第三方支付平台信用卡/Creditcard
                        (HiTRUSTpay)進行付款。
                      </h4>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <hr className="calc-hr" />
                <div className="d-flex myradio">
                  <input
                    id="radio2"
                    className="form-check-input"
                    type="radio"
                    value="貨到付款"
                    checked={payway === '貨到付款'}
                    onChange={(e) => {
                      setPayway(e.target.value)
                    }}
                  />
                  <label className="form-check-label" htmlFor="radio2">
                    黑貓貨到付款
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="text-center my-5 d-flex justify-content-between align-items-center">
            <div className="col-md-5 col-3 text-right">
              <Link
                to="/order/step1/step2"
                className="order-last-step ml-auto d-none d-md-block"
              >
                ⮨ 回到客戶資訊
              </Link>
            </div>
            <div className="col-md-2 col-6">
              <button
                className="btn important-btn md"
                onClick={(e) => {
                  e.preventDefault()
                  if (orderDetail.payWay === '信用卡') {
                    handleCShow()
                  } else {
                    HandleCheckout()
                  }
                }}
              >
                完成結帳
              </button>
            </div>

            <div className="col-md-5 col-3">&nbsp;</div>
          </div>
          <Link
            to="/order/step1/step2"
            className="order-last-step d-block d-md-none text-center"
          >
            ⮨ 回到客戶資訊
          </Link>
        </form>
        <Modal
          className="addtocart-success-modal"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center">
            <img
              className="checkmark mb-3"
              src="/myreact_gp/img/products/checked.svg"
              alt="checkmark"
            />
            <h2>購買完成</h2>
            <p>感謝您的購買！</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button
              className="btn important-btn md"
              onClick={() => {
                handleClose()
              }}
            >
              回首頁
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          className="addtocart-success-modal"
          show={creditCardShow}
          onHide={handleCClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="">
            <div
              className="creditCardDIV"
              onClick={(e) => {
                flip(e)
              }}
            >
              <div className="creditCard C1 C-Back mx-auto">
                <div className="backLine mt-3"></div>
                <div className="d-flex justify-content-end mt-3 mr-3">
                  <div
                    className="CVCcode my-auto ml-2"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    {sNum}
                  </div>
                  <div className="backLine2 ml-2"></div>
                </div>

                <div className="chip mr-3 ml-auto mt-3"></div>
              </div>
              <div className="creditCard C2 C-Front mx-auto">
                <div className="d-flex mt-2 ml-3 mr-3 justify-content-between">
                  <span style={{ fontSize: '15px' }}>CreditCard</span>
                  <span style={{ fontSize: '15px' }}>Bank</span>
                </div>
                <div className="d-flex mt-2">
                  <span className="my-auto ml-3 littleArrow">◀</span>
                  <div className="chip ml-1"></div>
                </div>
                <div className="cardNum mt-1 mx-auto">
                  {cardNum1}&nbsp;&nbsp;&nbsp;
                  {cardNum2}&nbsp;&nbsp;&nbsp;
                  {cardNum3}&nbsp;&nbsp;&nbsp;
                  {cardNum4}
                </div>
                <div className="cardDate ml-3 mt-2">
                  {cardMonth}&nbsp;/&nbsp;{cardDate}
                </div>
              </div>
            </div>

            <br />

            <div className="creditInput d-flex flex-column align-items-center mx-auto">
              <div className="d-flex align-items-center justify-content-between">
                <label htmlFor="">信用卡號　</label>
                <div className="d-flex justify-content-end">
                  <input
                    type="number"
                    value={cardNum1}
                    onChange={(e) => {
                      if (e.target.value.length < 5) {
                        setCardNum1(e.target.value)
                      }
                    }}
                    className="form-control primary-input CN"
                    ref={N1}
                  />
                  <input
                    type="number"
                    value={cardNum2}
                    onChange={(e) => {
                      if (e.target.value.length < 5) {
                        setCardNum2(e.target.value)
                      }
                    }}
                    className="form-control primary-input CN"
                    ref={N2}
                  />
                  <input
                    type="number"
                    value={cardNum3}
                    onChange={(e) => {
                      if (e.target.value.length < 5) {
                        setCardNum3(e.target.value)
                      }
                    }}
                    className="form-control primary-input CN"
                    ref={N3}
                  />
                  <input
                    type="number"
                    value={cardNum4}
                    onChange={(e) => {
                      if (e.target.value.length < 5) {
                        setCardNum4(e.target.value)
                      }
                    }}
                    className="form-control primary-input CN"
                    ref={N4}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <label htmlFor="">有效月年　</label>
                <div className="d-flex justify-content-end">
                  <input
                    type="number"
                    value={cardMonth}
                    onChange={(e) => {
                      if (e.target.value.length < 3) {
                        setCardMonth(e.target.value)
                      }
                    }}
                    className="form-control primary-input MD"
                    placeholder="Month"
                  />
                  &nbsp;
                  <span style={{ fontSize: '20px' }}>/</span>&nbsp;
                  <input
                    type="number"
                    value={cardDate}
                    onChange={(e) => {
                      if (e.target.value.length < 3) {
                        setCardDate(e.target.value)
                      }
                    }}
                    className="form-control primary-input MD"
                    placeholder="Year"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="">檢核碼　　</label>
                <input
                  type="number"
                  value={sNum}
                  onChange={(e) => {
                    if (e.target.value.length < 4) {
                      setSNum(e.target.value)
                    }
                  }}
                  className="form-control primary-input"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button
              className="btn important-btn md"
              onClick={() => {
                let cardNum =
                  cardNum1.toString() +
                  cardNum2.toString() +
                  cardNum3.toString() +
                  cardNum4.toString()
                let MD = cardDate.toString() + cardMonth.toString()
                if (
                  cardNum.length === 16 &&
                  MD.length === 4 &&
                  sNum.length === 3
                ) {
                  handleCClose()
                  HandleCheckout()
                }
              }}
            >
              送出
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
export default withRouter(OrderStep3)
