import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../members.scss'
import ReCAPTCHA from 'react-google-recaptcha'
import { useSelector } from 'react-redux'

import { setAuth } from '../../../actions/authAction'

const MemberLogin = (props) => {
  const dev = useSelector((state) => state.dev)

  function LoginAlert(title, text, icon, showConfirmButton, timer) {
    const Swal = require('sweetalert2')
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: showConfirmButton,
      timer: timer,
    })
  }

  function autoFormData() {
    setInputs((state) => ({
      ...state,
      account: 'member_ju4t@gmail.com',
      password: 'aaaa1111',
    }))
  }

  const dispatch = useDispatch()

  const [formData, setInputs] = useState({
    account: '',
    password: '',
  })

  const onChangeForField = (fieldName) => (event) => {
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }))
  }

  // Google Robot Verify
  const recaptchaRef = React.createRef()
  function verifyRobot(res) {
    setInputs({ ...formData, googleToken: res })
  }

  async function LoginToServer() {
    let isPass = false
    const url = dev
      ? 'http://localhost:3000/myreact_gp/data/members.json'
      : 'https://seandp1a.github.io/myreact_gp/data/members.json'

    const jwt = require('jsonwebtoken')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const userArr = JSON.parse(localStorage.getItem('LocalAccount'))
        userArr.push(data[0])
        userArr.forEach((v) => {
          if (
            formData.account === v.account &&
            formData.password === v.password
          )
            isPass = true
        })
        if (isPass) {
          let token = jwt.sign(data[0], 'ju4t', { expiresIn: '1d' })
          let result = 'Bearer ' + token
          dispatch(setAuth(result))
          // props.history.push(dev ? '/../' : '/myreact_gp')
          props.history.push('/')
        } else {
          LoginAlert('登入失敗', '帳號或密碼錯誤', 'error', false, 1600)
        }
      })
  }
  return (
    <div className="container member-content">
      <Row className="breadcrumb-leftmargin">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">首頁</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href="/member/profile">會員中心</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              會員登入
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col lg="4">
          <div className="loginkv"></div>
        </Col>
        <Col lg="6">
          <h3 className="mhead">會員登入</h3>
          <Form>
            <Form.Group className="m-5">
              <Form.Label className="form-label">會員帳號</Form.Label>
              <Form.Control
                type="email"
                id="account"
                className="primary-input"
                value={formData.account}
                onChange={onChangeForField('account')}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">登入密碼</Form.Label>
              <Form.Control
                type="password"
                id="password"
                className="primary-input"
                value={formData.password}
                onChange={onChangeForField('password')}
              />
            </Form.Group>

            <ReCAPTCHA
              ref={recaptchaRef}
              className="ml-5 g-recaptcha"
              sitekey="Your Api Key"
              onChange={verifyRobot}
            />
            <div className="ml-5 mtext text-danger">*Have no API Key</div>

            <div className="d-flex justify-content-center m-4 mt-5">
              <Button
                type="button"
                className="btn primary-btn md mr-2"
                onClick={() => {
                  LoginToServer()
                }}
              >
                登入
              </Button>

              <Button
                type="button"
                className="btn primary-btn-demo md"
                onClick={() => {
                  autoFormData()
                }}
              >
                一鍵填表
              </Button>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="ml-5">
                <a href="/member/forget">忘記密碼</a>
              </div>
              <div className="mr-5">
                還不是會員？<a href="/member/register">立即註冊</a>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(MemberLogin)
