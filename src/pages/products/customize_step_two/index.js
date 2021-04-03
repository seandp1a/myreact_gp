import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { HiOutlineTrash } from 'react-icons/hi'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import useImage from 'use-image' // this is for react-konva

import './0_customize_step_two.scss'
import CustomizeHeading from '../components/CustomizeHeading'
import CustomizeSteps from '../components/CustomizeSteps'
import CustomizePhoto from './CustomizePhoto'
import SelectColor from '../components/SelectColor'
import FileUploadBlock from './FileUploadBlock'
import CustomizeTextBlock from './CustomizeTextBlock'

const CustomizeStepTwo = (props) => {
  const myurl = props.dev ? 'myreact_gp/' : 'myreact_gp/'
  const myjson = props.dev
    ? 'http://localhost:3000/myreact_gp/data/phone_data.json'
    : 'https://seandp1a.github.io/myreact_gp/data/phone_data.json'

  const history = useHistory()

  // state for selected phone shell radio button
  const [shellRadioValue, setShellRadioValue] = useState('black')

  // state for the canvas uploaded image (initially a transparent image, change the src of the image when a file is uploaded)
  const [canvasImg, setCanvasImg] = useState(
    localStorage.getItem('newBlob')
      ? localStorage.getItem('newBlob')
      : '/img/products/transparent-block.svg'
  )
  // uploadedImage will be passed to <Image>
  const [uploadedImage] = useImage(canvasImg)

  // states for customized text stuff
  const [text, setText] = useState('')
  const [textColor, setTextColor] = useState('#000000')
  const [fontFamily, setFontFamily] = useState('Roboto')
  const [fontWeight, setFontWeight] = useState(500)
  const [fontSize, setFontSize] = useState(20)

  // state to store shell radio info for customized backend (because we have to send id and shell_color_chn also so the data set is the same as product details)
  // note that it's called optionalInfo because the product details also use the SelectColor component, but will not have optionalInfo
  const [optionalInfo, setOptionalInfo] = useState({
    hex_color: '#000',
    color: 'black',
    id: 1,
    shell_color_chn: '黑色',
  })

  // state to store flag when 下一步 button is clicked
  // (because the 下一步 button and CustomizePhoto are different child components which makes it hard to pass data)
  // 下一步 button will trigger the submitFlag, and CustomizePhoto will listen for changes
  const [submitFlag, setSubmitFlag] = useState(false)

  const shellRadios = [
    { hex_color: '#000', color: 'black', id: 1, shell_color_chn: '黑色' },
    { hex_color: '#bfbfbf', color: 'silver', id: 2, shell_color_chn: '白色' },
    { hex_color: '#fff', color: 'white', id: 3, shell_color_chn: '銀色' },
    { hex_color: '#485672', color: 'blue', id: 4, shell_color_chn: '紅色' },
    { hex_color: '#667262', color: 'green', id: 5, shell_color_chn: '綠色' },
    { hex_color: '#891515', color: 'red', id: 6, shell_color_chn: '藍色' },
    { hex_color: '#e9e400', color: 'yellow', id: 7, shell_color_chn: '黃色' },
  ]

  return (
    <Container className="customize-step-two">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/customize/step-one">客製化工作室</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          第二步
        </li>
      </ol>
      <CustomizeHeading />
      <CustomizeSteps
        firstWordClass="d-none d-sm-block"
        secondWordClass="customize-active"
        thirdWordClass="d-none d-sm-block"
        secondCircleClass="customize-active"
      />
      <Row>
        <Col sm={5} lg={6}>
          <h4 className="text-center mt-3">
            手機型號:{' '}
            {localStorage.getItem('cst_phone_model').replaceAll('-', ' ')}
          </h4>
          <div className="d-flex justify-content-center">
            <CustomizePhoto
              phoneModel={localStorage.getItem('cst_phone_model')}
              phoneColor={localStorage.getItem('cst_phone_color')}
              shellRadioValue={shellRadioValue}
              uploadedImage={uploadedImage}
              text={text}
              textColor={textColor}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
              fontSize={fontSize}
              submitFlag={submitFlag}
              setSubmitFlag={setSubmitFlag}
              myurl={myurl}
              myjson={myjson}
            />
          </div>
          <div
            className="trash-block d-flex justify-content-center mt-3 mx-auto"
            style={{ display: 'flex', lineHeight: '32px' }}
            onClick={() => {
              // set canvas image back to trasparent block
              setCanvasImg('/img/products/transparent-block.svg')

              // reset file upload form
              let fileUploadBlock = document.querySelector('#fileUploadBlock')
              fileUploadBlock.reset()

              // reset text
              setText('')
            }}
          >
            <HiOutlineTrash style={{ fontSize: '30px' }} />
            全部清除
          </div>
        </Col>

        <Col sm={7} lg={6}>
          <div className="step-two-right-block px-1 px-xl-5 mx-0 mx-xl-5">
            <div>
              <Form.Label className="products-item-title mt-3">
                邊框顏色
              </Form.Label>
              <br />
              <SelectColor
                radioValue={shellRadioValue}
                setRadioValue={setShellRadioValue}
                radios={shellRadios}
                setOptionalInfo={setOptionalInfo}
              />
            </div>

            <FileUploadBlock setCanvasImg={setCanvasImg} />

            <CustomizeTextBlock
              text={text}
              setText={setText}
              textColor={textColor}
              setTextColor={setTextColor}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              fontWeight={fontWeight}
              setFontWeight={setFontWeight}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />

            <div className="d-flex justify-content-between mt-4">
              <Link to="/customize/step-one">
                <button className="btn btn-outline-primary btn-md">
                  <FiChevronLeft
                    style={{
                      fontSize: '16px',
                      verticalAlign: 'middle',
                    }}
                  />
                  &nbsp;&nbsp;上一步
                </button>
              </Link>
              <button
                className="btn primary-btn btn-md"
                onClick={() => {
                  // set submit flag to true so CustomizePhoto can save the photo
                  setSubmitFlag(true)

                  // save relavent info to local storage so step three can have those info
                  localStorage.setItem(
                    'shell_color_chn',
                    optionalInfo.shell_color_chn
                  )
                  localStorage.setItem('shell_color_en', shellRadioValue)
                  localStorage.setItem('shell_id', optionalInfo.id)
                  // console.log(localStorage.getItem('canvasImg'))
                  // go to step three page
                  setTimeout(() => {
                    history.push('/customize/step-three')
                  }, 300)
                }}
              >
                下一步&nbsp;&nbsp;
                <FiChevronRight
                  style={{ fontSize: '16px', verticalAlign: 'middle' }}
                />
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default CustomizeStepTwo
