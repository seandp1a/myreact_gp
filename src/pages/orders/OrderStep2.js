import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'

import OrderStep0 from './OrderStep0'
import CartCheck from './cartlist/CartCheck'
import OrderBread from './OrderBread'
import './order-content.scss'
function OrderStep2(props) {
  const {
    cartList,
    orderDetail,
    memberData,
    orderDetail2,
    setOrderDetail2,
    LogOut,
    myAlert,
  } = props
  const disnum = orderDetail.discount
  const discountList = {
    1: '0%',
    0.9: '10%',
    0.8: '20%',
    0.7: '30%',
  }

  const [CName, setCName] = useState(orderDetail2.name ? orderDetail2.name : '')

  const [CPhone, setCPhone] = useState(
    orderDetail2.phone ? orderDetail2.phone : ''
  )
  const [CCity, setCCity] = useState(orderDetail2.city ? orderDetail2.city : '')
  const [CAddNum, setCAddNum] = useState(
    orderDetail2.addNum ? orderDetail2.addNum : ''
  )
  const [CAddress, setCAddress] = useState(
    orderDetail2.address ? orderDetail2.address : ''
  )

  const [autoData, setAutoData] = useState(false)

  const NextStep = () => {
    // 檢查欄位是否完整
    if (!CName || !CCity || !CAddress || !CPhone) {
      myAlert('Error', '請輸入完整收件資料', 'error', false, 1600)
      return
    }

    // 判斷是 超商取貨OR黑貓宅配 決定給step3的資訊
    if (orderDetail.getWay !== '超商取貨') {
      const detail = {
        name: CName,
        phone: CPhone,
        city: CCity,
        addNum: CAddNum,
        address: CAddress,
        store: '',
      }
      setOrderDetail2(detail)
    } else {
      const detail = {
        name: CName,
        phone: CPhone,
        city: CCity,
        addNum: CAddNum,
        address: CAddress,
        store: orderDetail2.store,
        block: orderDetail2.block,
      }
      setOrderDetail2(detail)
    }

    props.history.push('/order/step1/step2/step3')
  }

  if (cartList == 0) {
    return <OrderStep0 />
  }
  //若在step2重新整理導致orderDetail資訊初始化，其中setted變為fales，就導回step1
  if (!orderDetail.setted) {
    return <Redirect to="/order/step1"></Redirect>
  }
  return (
    <>
      <Container className="order-content">
        <OrderBread />
        <div className="order-step-banner mt-2 mb-5">
          <img
            src="/myreact_gp/img/orders/B_STEP2.svg"
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

        <hr className="stephr v2" />

        <form className="order-customer-detail">
          <h2>聯絡資訊</h2>
          <div className="d-flex align-items-center">
            <div className="ml-5">
              <h3>暱稱：&nbsp; {memberData.name}&nbsp;</h3>
              <h3>
                (&nbsp;
                {memberData.email}&nbsp;)
              </h3>
              <h3
                className="mb-0 mt-4 logout "
                onClick={() => {
                  props.history.push('/order/step1')
                  LogOut()
                }}
              >
                登出
              </h3>
            </div>
          </div>
          <div className="form-group form-check order-checkbox my-4">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" />
              我想收到最新消息和限定優惠通知
            </label>
          </div>

          <h2>收件資訊</h2>
          {orderDetail.getWay === '超商取貨' ? (
            <>
              <h3 className="danger-text">
                選擇超商取件，姓名請填寫與身分證件相符，避免造成無法取貨
              </h3>
              <div className="mt-3">
                <h3 className="mb-0">
                  7-11 {CCity} {orderDetail2.store}店 取貨付款
                </h3>
                <h3>
                  地址：台灣 {CCity}
                  {CAddress.slice(3)}
                </h3>
              </div>
            </>
          ) : (
            ''
          )}

          <div className="form-group my-3">
            <input
              type="text"
              className="form-control primary-input"
              name=""
              id=""
              placeholder="姓名"
              value={CName}
              onChange={(e) => {
                setCName(e.target.value)
              }}
            />
            <input
              type="phone"
              className="form-control primary-input my-4"
              name=""
              id=""
              placeholder="聯絡電話"
              value={CPhone}
              onChange={(e) => {
                setCPhone(e.target.value)
              }}
            />
          </div>
          {orderDetail.getWay !== '超商取貨' ? (
            <div className="form-group my-3">
              <div className="d-flex flex-column flex-md-row justify-content-between my-2 order-inline-input">
                <input
                  type="text"
                  className="form-control primary-input"
                  name=""
                  id=""
                  placeholder="縣/市"
                  value={CCity}
                  onChange={(e) => {
                    setCCity(e.target.value)
                  }}
                />
                <input
                  type="text"
                  className="form-control primary-input"
                  name=""
                  id=""
                  placeholder="郵遞區號"
                  value={CAddNum}
                  onChange={(e) => {
                    setCAddNum(e.target.value)
                  }}
                />
              </div>
              <input
                type="phone"
                className="form-control primary-input my-4"
                name=""
                id=""
                placeholder="地址"
                value={CAddress}
                onChange={(e) => {
                  setCAddress(e.target.value)
                }}
              />
            </div>
          ) : (
            ''
          )}

          <div className="form-group form-check order-checkbox my-4">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={autoData}
                onChange={() => {
                  if (!autoData) {
                    setAutoData(true)
                    setCName(memberData.name)
                    setCPhone(memberData.phone)
                  } else {
                    setAutoData(false)
                    setCName('')
                    setCPhone('')
                  }
                }}
              />
              收件人資訊同會員資訊
            </label>
          </div>
        </form>

        <div className="text-center my-5 d-flex justify-content-between align-items-center">
          <div className="col-md-5 col-3 text-right">
            <Link
              to="/order/step1"
              className="order-last-step ml-auto d-none d-md-block"
            >
              ⮨ 回到購物車
            </Link>
          </div>
          <div className="col-md-2 col-6">
            <button
              className="btn important-btn md"
              onClick={() => {
                NextStep()
              }}
            >
              下一步:確認結帳資料
            </button>
          </div>

          <div className="col-md-5 col-3">&nbsp;</div>
        </div>
        <Link
          to="/order/step1"
          className="order-last-step d-block d-md-none text-center"
        >
          ⮨ 回到購物車
        </Link>
      </Container>
    </>
  )
}
export default withRouter(OrderStep2)
