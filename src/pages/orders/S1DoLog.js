import { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import storeData from './config/storeData'
import { Modal } from 'react-bootstrap'

import CartList from './cartlist/CartList'

function S1DoLog(props) {
  const { icon_cross, icon_minus, icon_add } = props
  const {
    cartList,
    HandleAmount,
    Add_Minus,
    setOrderDetail,
    orderDetail,
    memberData,
    orderDetail2,
    setOrderDetail2,
    myAlert,
    storeData,
    cityList,
  } = props

  const printTag = memberData.coupon

  // 折價券 選去狀態
  const [tags, setTags] = useState(orderDetail.tag)
  // 當前折扣率
  const [tagState, setTagState] = useState(orderDetail.discount)

  // select的state
  const [delivery, setDelivery] = useState(orderDetail.getWay)
  const [pay, setPay] = useState(orderDetail.payWay)
  const [receipt, setReceipt] = useState(orderDetail.receipt)

  //modal > select 的 state
  const [btnName, setBtnName] = useState(
    orderDetail2.store
      ? orderDetail2.city +
          '-' +
          orderDetail2.block +
          ' ' +
          orderDetail2.store +
          '門市'
      : '選擇門市'
  )
  const [city, setCity] = useState(orderDetail2.city ? orderDetail2.city : '0')
  const [block, setBlock] = useState(
    orderDetail2.block ? orderDetail2.block : '0'
  )
  const [store, setStore] = useState(
    orderDetail2.store ? orderDetail2.store : '0'
  )
  const [blockList, setBlockList] = useState([])
  const [storeList, setStoreList] = useState([])

  // 計算總價
  const CalcTprice = (disCount) => {
    let Tprice = 0
    cartList.forEach((item) => {
      Tprice += item.quantity * item.price
    })
    if (disCount) {
      return Math.round(Tprice * disCount)
    } else {
      return Math.round(Tprice)
    }
  }

  // 控制TAG開關
  const ChooseTag = (id) => {
    const tagList = [...tags]
    const index = tagList.findIndex((item) => item.id === id)
    const newTagList = tagList.map((v, i) => {
      if (i !== index) {
        v.picked = false
      } else {
        v.picked = !v.picked
        if (v.picked) {
          setTagState(v.discount)
        } else {
          setTagState(1)
        }
      }

      return v
    })
    setTags(newTagList)
    setOrderDetail({ tag: tags })
  }

  //BTN CLICKED
  const NextStep = () => {
    const detail = {
      tag: tags,
      Tprice: CalcTprice(),
      discount: tagState,
      getWay: delivery,
      payWay: pay,
      receipt: receipt,
      setted: true,
    }
    setOrderDetail(detail)
    if (delivery !== '超商取貨') {
      setOrderDetail2({
        name: '',
        phone: '',
        city: '',
        addNum: '',
        address: '',
        store: '',
        block: '',
      })
    } else {
      if (store === '0') {
        myAlert('Error', '尚未選擇門市', 'error', false, 1600)
        return
      }
    }
    props.history.push('/order/step1/step2')
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleStore = () => {
    if (delivery === '超商取貨') {
      if (city === '0' || block === '0' || store === '0') {
        setBtnName('選擇門市')
        return
      }
      const temp = { ...orderDetail2 }
      temp.store = store
      temp.city = city
      temp.address = storeData[city][block].filter(
        (item) => item.store === store
      )[0].address
      temp.block = block
      setOrderDetail2(temp)
      setBtnName(city + '-' + block + ' ' + store + '門市')
    }
  }

  useEffect(() => {}, [tags])

  useEffect(() => {
    if (delivery === '黑貓宅配') {
      setPay('信用卡')
    } else {
      setPay('貨到付款')
    }
  }, [delivery])

  useEffect(() => {
    if (show) {
      if (city !== '0') {
        setBlockList(Object.keys(storeData[city]))
      } else {
        setBlockList([])
      }
    }
  }, [city])

  useEffect(() => {
    if (show) {
      if (block !== '0') {
        const tempList = []
        storeData[city][block].forEach((v) => {
          tempList.push(v.store)
        })
        setStoreList(tempList)
      } else {
        setStoreList([])
      }
    }
  }, [block])

  return (
    <>
      <div className="order-step-banner mt-2 mb-5">
        <img
          src="/myreact_gp/img/orders/B_STEP1.svg"
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

      {/* 購物車畫面渲染 ▼ */}

      <div className="d-flex flex-column cart-div">
        {cartList.map((v, i) => {
          return (
            <CartList
              key={i}
              v={v}
              i={i}
              HandleAmount={HandleAmount}
              Add_Minus={Add_Minus}
              icon_cross={icon_cross}
              icon_minus={icon_minus}
              icon_add={icon_add}
            ></CartList>
          )
        })}
      </div>

      <hr className="myhr2" />
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="form-group">
          <textarea
            className="form-control order-note"
            id="order-note"
            name="order-note"
            rows="8"
            placeholder="
          訂單備註：
          ＊實際出貨僅會依照您的訂單內容出
          貨，備註填寫相關需求無法協助處理
          ，例如：修改客製化圖片等。　"
          ></textarea>
        </div>

        <div className="d-flex flex-column align-items-end">
          <div className="d-flex my-2">
            <h3>商品金額＄</h3>
            <h3 className="order-price-label">{CalcTprice()} TWD</h3>
          </div>
          <div className="d-flex mt-2">
            <h3>運費小記＄</h3>
            <h3 className="order-price-label">0 TWD</h3>
          </div>

          <hr className="calc-hr" />

          <div className="d-flex align-items-center my-2">
            <h3 className="my-0">您的優惠券</h3>
            <div className="badge-group">
              {printTag.map((v, i) => {
                if (v === '九折') {
                  return (
                    <Link
                      key={i}
                      onClick={(e) => {
                        e.preventDefault()
                        ChooseTag(1)
                      }}
                      className={`badge badge-cuppon ${
                        orderDetail.tag[0].picked ? 'active' : ''
                      }`}
                      to="/"
                    >
                      9折優惠券
                    </Link>
                  )
                }
                if (v === '八折') {
                  return (
                    <Link
                      key={i}
                      onClick={(e) => {
                        e.preventDefault()
                        ChooseTag(2)
                      }}
                      className={`badge badge-cuppon ${
                        orderDetail.tag[1].picked ? 'active' : ''
                      }`}
                      to="/"
                    >
                      8折優惠券
                    </Link>
                  )
                }
                if (v === '七折') {
                  return (
                    <Link
                      key={i}
                      onClick={(e) => {
                        e.preventDefault()
                        ChooseTag(3)
                      }}
                      className={`badge badge-cuppon ${
                        orderDetail.tag[2].picked ? 'active' : ''
                      }`}
                      to="/"
                    >
                      7折優惠券
                    </Link>
                  )
                }
              })}
            </div>
          </div>

          <div className="d-flex mt-3">
            <h3>應付金額＄</h3>
            <h3 className="order-price-label">
              {`${CalcTprice(tagState)} `}
              TWD
            </h3>
          </div>

          <div className="form-group form-check order-checkbox my-2">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" />
              我同意辦理退/換貨時，由JU4T代為處裡銷售憑證(發票處理/銷售折讓)以加速退款流程。
            </label>
          </div>
        </div>
      </div>

      <hr className="stephr v1" />

      <form className="order-deliver-form ml-5">
        <div className="form-group">
          <label className="order-select-label">選擇取貨方式</label>
          <select
            className="btn primary-select ml-4 mt-2"
            value={delivery}
            onChange={(e) => {
              setDelivery(e.target.value)
            }}
          >
            <option value="超商取貨">超商取貨</option>

            <option value="黑貓宅配">黑貓宅配</option>
          </select>
          {delivery === '黑貓宅配' ? (
            <h6 className="mt-3">不支援郵政信箱</h6>
          ) : (
            <>
              <small className="form-text text-bold mt-4">
                {' '}
                超商取貨皆為7-11門市
              </small>
              <button
                className="btn primary-btn md ml-4 mt-2"
                onClick={(e) => {
                  e.preventDefault()
                  handleShow()
                }}
              >
                {btnName}
              </button>
            </>
          )}
        </div>
        {delivery === '黑貓宅配' ? (
          ''
        ) : (
          <div className="form-group my-5">
            <label className="order-select-label">選擇付款方式</label>
            <select
              className="btn primary-select ml-4 mt-2"
              value={pay}
              onChange={(e) => {
                setPay(e.target.value)
              }}
            >
              <option value="貨到付款">貨到付款</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label className="order-select-label">發票類型</label>
          <select
            className="btn primary-select ml-4 mt-2"
            value={receipt}
            onChange={(e) => {
              setReceipt(e.target.value)
            }}
          >
            <option value="二聯式電子發票">二聯式電子發票</option>
            <option value="個人-手機條碼載具">個人-手機條碼載具</option>
            <option value="公司-統一編號">公司-統一編號</option>
            <option value="捐贈發票">捐贈發票</option>
          </select>
          <small className="form-text text-muted mt-4">
            依財政部規定發票已託管，將不再開立紙本發票，電子發票以信箱方式寄出。
          </small>
        </div>
      </form>

      <div className="order-shop-note">
        <h4 style={{ fontWeight: 500 }}>請詳閱購物需知</h4>
        <ul>
          <li>
            訂單出貨時間說明：訂單訂購一般款式（非印刷款），下單後需2個工作天安排出貨
          </li>
          <li>
            若您所選取的門市位置為學區、科技園區、假日不進貨(非24小時營業)門市，將會影響到您收到商品的時間，建議選取鄰近營業時間24小時門市才不會延遲收到物品的時間!
          </li>
          <li>
            JU4T保護殼及保護貼僅為降低手機遭碰撞時破損的風險，如有其他使用原因而導致手機壞損概不負責。如同其他保護類產品一樣，JU4T
            所有保護殼與保護膜產品會為犧牲自身去保護手機，因此當你發現產品有明顯撞擊變形或嚴重耗損等現象，建議您停止使用並更換全新商品以確保賈斯特產品之保護性是最佳狀態。
          </li>
        </ul>
      </div>

      <div className="text-center my-5">
        <button
          className="btn important-btn md mx-auto"
          onClick={() => {
            NextStep()
          }}
        >
          來去結帳
        </button>

        <small className="mt-3 d-block text-muted text-center">
          前往結帳，表示您已接受網站所有的使用條款及聲明 Evolutive Labs' Sales
          and Refunds Policy。
        </small>

        <Modal
          className="addtocart-success-modal"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center">
            <select
              name="city"
              id="city"
              className="btn primary-select my-2"
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
                setBlock('0')
                setStore('0')
              }}
            >
              <option value="0">請選擇縣市</option>
              {cityList
                ? cityList.map((v, i) => {
                    return (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    )
                  })
                : ''}
            </select>
            <select
              name="block"
              id="block"
              className="btn primary-select my-2"
              value={block}
              onChange={(e) => {
                setBlock(e.target.value)
                setStore('0')
              }}
            >
              <option value="0">請選擇區域</option>
              {blockList
                ? blockList.map((v, i) => {
                    return (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    )
                  })
                : ''}
            </select>
            <select
              name="store"
              id="store"
              className="btn primary-select my-2"
              value={store}
              onChange={(e) => {
                setStore(e.target.value)
              }}
            >
              <option value="0">請選擇門市</option>
              {storeList
                ? storeList.map((v, i) => {
                    return (
                      <option key={i} value={v}>
                        {v} &nbsp;&nbsp;&nbsp;門市
                      </option>
                    )
                  })
                : ''}
            </select>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button
              className="btn important-btn md mb-4"
              onClick={() => {
                handleClose()
                handleStore()
              }}
            >
              確定門市
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default withRouter(S1DoLog)
