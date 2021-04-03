import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FiChevronRight } from 'react-icons/fi'

import './0_customize_step_one.scss'
import CustomizeHeading from '../components/CustomizeHeading'
import CustomizeSteps from '../components/CustomizeSteps'
import SelectPhoneModel from '../components/SelectPhoneModel'
import SelectColor from '../components/SelectColor'

const CustomizeStepOne = (props) => {
  const myurl = props.dev ? 'myreact_gp/' : 'myreact_gp/'
  const myjson = props.dev
    ? 'http://localhost:3000/myreact_gp/data/phone_data.json'
    : 'https://seandp1a.github.io/myreact_gp/data/phone_data.json'

  const history = useHistory()

  //state for phone model
  const [phoneModel, setPhoneModel] = useState(
    localStorage.getItem('cst_phone_model') || 'iPhone-6'
  )

  // state for selected phone color
  const cst_phone_color = localStorage.getItem('cst_phone_color')
    ? localStorage.getItem('cst_phone_color').replaceAll('-', ' ')
    : ''
  const [phoneColor, setPhoneColor] = useState(cst_phone_color)

  // state to store the phone color options to render (color options differ for each phone model)
  // this is not set to an empty array to prevent the error of "Cannot read property 'color' of undefined"
  const [phoneColorsArr, setPhoneColorsArr] = useState([
    { color: '', hex_color: '', model_id: '' },
  ])

  // shortenedPhoneModelName is used for the phone photo and camera photo names
  const shortenedPhoneModelName = phoneModel
    .replaceAll('Phone-', '')
    .replaceAll(' ', '-')

  // onchange handler for SelectPhoneModel
  const handleSelectPhoneModel = (e) => {
    setPhoneModel(e.target.value)
  }

  const handleModel = (modelName, modelArr) => {
    for (const v of modelArr) {
      if (v.model === modelName) {
        // console.log(v.id, v.model)
        return v.id
      }
    }
  }

  const handleColor = (modelId, pmcArr) => {
    const tempArr = []
    for (const v of pmcArr) {
      if (v.model_id === modelId) {
        tempArr.push({
          color: v.color,
          hex_color: v.hex_color,
          model_id: v.model_id,
        })
      }
    }
    return tempArr
  }

  // change the phone color options when the selected phone model changes
  useEffect(() => {
    const phoneModelName = phoneModel.replaceAll('-', ' ')

    fetch(myjson)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const model_id = handleModel(phoneModelName, data[0].data)
        if (model_id != 0) {
          const temp = handleColor(model_id, data[5].data)
          setPhoneColorsArr(temp)
        }
      })
    // fetch the phone color options for the selected phone model
  }, [phoneModel])

  // set the default phone color to the first one if there is no local storage data for selected phone color
  useEffect(() => {
    let cst_phone_color

    // check is the local storage has cst_phone_color value
    if (!localStorage.getItem('cst_phone_color')) {
      // no local storage color => set default radio to the first one in the phoneColorsArr
      cst_phone_color = phoneColorsArr[0].color
    } else {
      cst_phone_color = localStorage
        .getItem('cst_phone_color')
        .replaceAll('-', ' ')
      // check if the local storage color is in the radio colors array (different phones have different colors avaialble)
      let temp_color_arr = []
      phoneColorsArr.forEach((obj) => temp_color_arr.push(obj.color))

      // if the local storage color is not in the shown radio colors, set the selected color to the first one in phoneColorsArr
      if (!temp_color_arr.includes(cst_phone_color)) {
        cst_phone_color = phoneColorsArr[0].color
      }
    }

    setPhoneColor(cst_phone_color)
  }, [phoneColorsArr])

  return (
    <Container className="customize-step-one">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/customize/step-one">客製化工作室</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          第一步
        </li>
      </ol>
      <CustomizeHeading />
      <CustomizeSteps
        firstWordClass="customize-active"
        secondWordClass="d-none d-sm-block"
        thirdWordClass="d-none d-sm-block"
        firstCircleClass="customize-active"
      />
      <Row>
        <Col sm={6} className="d-flex justify-content-center">
          <img
            src={`/${myurl}img/products/phones/${phoneModel}/${shortenedPhoneModelName}-${phoneColor.replaceAll(
              ' ',
              '-'
            )}.png`}
            className="img-fluid"
            alt="手機照片"
          />
        </Col>
        <Col sm={6}>
          <div className="px-5 mx-0 mx-md-5">
            <SelectPhoneModel
              phoneModel={phoneModel}
              setPhoneModel={setPhoneModel}
              handleSelectPhoneModel={handleSelectPhoneModel}
            />
            <div>
              <Form.Label className="products-item-title mt-3">
                手機顏色
              </Form.Label>
            </div>
            <div>
              <SelectColor
                radioValue={phoneColor}
                setRadioValue={setPhoneColor}
                radios={phoneColorsArr}
              />
            </div>
            <div className="price-block mt-3 mt-md-5">
              <div className="d-flex justify-content-between pt-3">
                <div>價格</div>
                <div>$ 1200 TWD</div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn important-btn md"
                  onClick={() => {
                    // store customize info in local storage
                    localStorage.setItem('cst_phone_model', phoneModel)
                    localStorage.setItem(
                      'cst_phone_color',
                      phoneColor.replaceAll(' ', '-')
                    )
                    // redirect to step two
                    setTimeout(() => {
                      history.push(`/customize/step-two`)
                    }, 500)
                  }}
                >
                  下一步&nbsp;&nbsp;
                  <FiChevronRight
                    style={{ fontSize: '16px', verticalAlign: 'middle' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default CustomizeStepOne
