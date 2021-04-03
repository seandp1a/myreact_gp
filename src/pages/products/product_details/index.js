import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'
import Cookies from 'js-cookie'

import './0_product_details_style.scss'
import ProductPhoto from './ProductPhoto'
import DetailsTable from '../components/DetailsTable'
import AddToCartModal from '../components/AddToCartModal'
import { increment } from '../../../actions/bagCounterAction'

const ProductDetails = (props) => {
  const myurl = props.dev ? 'myreact_gp/' : ''
  const myjson = props.dev
    ? 'http://localhost:3000/myreact_gp/data/phone_data.json'
    : 'https://seandp1a.github.io/myreact_gp/data/phone_data.json'

  const { phoneModel, designId } = useParams()
  const location = useLocation()
  const parsed = queryString.parse(location.search)

  // state to store design item info
  const [designInfo, setDesignInfo] = useState({})

  // redux dispatch
  const dispatch = useDispatch()

  // state for modal
  const [show, setShow] = useState(false)

  // functions to show or close modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDesingInfo = (designId, DArr, SArr, ShellArr, shellColor) => {
    const designInfo = []
    DArr.forEach((v) => {
      if (designId === v.id) {
        const temp = {
          series_id: v.series_id,
          design_id: v.id,
          design_name_chn: v.design_name_chn,
          design_name_eng: v.design_name_eng,
        }
        designInfo.push(temp)
      }
    })

    ShellArr.forEach((v) => {
      if (shellColor === v.shell_color_en) {
        designInfo[0].shell_id = v.id
        designInfo[0].shell_color_en = v.shell_color_en
        designInfo[0].shell_color_chn = v.shell_color_chn
      }
    })

    SArr.forEach((v) => {
      if (v.id === designInfo[0].series_id) {
        designInfo[0].series_name_chn = v.series_name_chn
        designInfo[0].series_name_eng = v.series_name_eng
        designInfo[0].price = v.price
      }
    })
    console.log(designInfo)
    return designInfo[0]
  }

  // fetch design item info (the dependencies are only there because react throws a caution if they are not there)
  useEffect(() => {
    fetch(myjson)
      .then((response) => response.json())
      .then((data) => {
        const temp = handleDesingInfo(
          designId,
          data[2].data,
          data[1].data,
          data[3].data,
          parsed.shellColor
        )
        setDesignInfo(temp)
      })
  }, [parsed.shellColor, designId])

  return (
    <Container className="product-details">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/products?phone=${phoneModel}`}>產品</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          產品詳細頁
        </li>
      </ol>
      <Row>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <ProductPhoto
            phoneModel={phoneModel}
            phoneColor={parsed.phoneColor}
            shellColor={parsed.shellColor}
            designInfo={designInfo}
            myurl={myurl}
          />
        </Col>
        <Col xs={12} md={6} className="light-gray-bottom-border">
          <div>
            <DetailsTable
              phoneModel={phoneModel.replaceAll('-', ' ')}
              shellColor={designInfo.shell_color_chn}
              seriesName={designInfo.series_name_chn}
              designName={designInfo.design_name_chn}
            />
          </div>
          <div className="price-block light-gray-bottom-top mt-5 px-5">
            <div className="d-flex justify-content-between pt-3">
              <div>價格</div>
              <div>$ {designInfo.price} TWD</div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn primary-btn md"
                onClick={() => {
                  let infoToSend = designInfo
                  infoToSend.phoneModel = phoneModel.replaceAll('-', ' ')
                  infoToSend.phoneColor = parsed.phoneColor
                  infoToSend.quantity = 1

                  // get the old token data if there is one, this is because the token will contain an array of products and we need to update the old token
                  let oldToken = Cookies.get('cart_products')
                  if (oldToken) {
                    // console.log(JSON.parse(oldToken))
                    // console.log(Array.isArray(JSON.parse(oldToken)))
                    // console.log(typeof JSON.parse(oldToken))
                    let temp = []
                    Cookies.set('cart_products', {}, { expires: 1 })
                    if (Array.isArray(JSON.parse(oldToken))) {
                      temp = [...JSON.parse(oldToken)]
                      temp.push(infoToSend)
                    } else {
                      temp.push(JSON.parse(oldToken), infoToSend)
                    }

                    Cookies.set('cart_products', temp, { expires: 1 })
                  } else {
                    Cookies.set('cart_products', infoToSend, { expires: 1 })
                  }

                  dispatch(increment())
                  handleShow()
                }}
              >
                加入購物車
              </button>
            </div>

            {/* 已加入購物車 modal */}
            <AddToCartModal
              myurl={myurl}
              show={show}
              handleClose={handleClose}
              phoneModel={phoneModel}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails
