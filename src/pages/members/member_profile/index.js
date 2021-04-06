import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { updateAuth } from '../../../actions/authAction'
import '../members.scss'
import moment from 'moment'

const MemberProfile = () => {
  const [formData, setInputs] = useState({
    name: '',
    mobile: '',
    birthday: '',
    password: '',
  })

  const onChangeForField = (fieldName) => (event) => {
    checkFormData(fieldName, event.target.value)
    // Object.keys(formData).forEach((fieldName) => {
    //   checkFormData(fieldName, formData[fieldName]);
    // });
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }))
  }

  const [formError, setFormError] = useState({
    name: '',
    mobile: '',
    birthday: '',
    password: '',
  })

  function checkFormData(fieldName, fieldValue) {
    console.log(fieldName)
    let checkResult = false
    switch (fieldName) {
      case 'name':
        // console.log('fieldValue:', fieldValue)
        checkResult =
          fieldValue.length && fieldValue.length >= 2 && fieldValue.length < 11
        if (!checkResult) {
          setFormError((state) => ({
            ...state,
            name: '請輸入2~10個中文或英文字元',
          }))
        }
        break
      case 'mobile':
        // console.log('fieldValue:', fieldValue)
        checkResult = fieldValue && fieldValue.match(/^09\d{2}-?\d{3}-?\d{3}$/)
        if (!checkResult) {
          setFormError((state) => ({
            ...state,
            mobile: '請輸入09○○-○○○-○○○格式',
          }))
        }
        break
      case 'birthday':
        // console.log('fieldValue:', fieldValue)
        checkResult = fieldValue.length && fieldValue.length > 1
        if (!checkResult) {
          setFormError((state) => ({ ...state, birthday: '請填寫生日日期' }))
        }
        break
      case 'password':
        // console.log('fieldValue:', fieldValue)
        checkResult =
          fieldValue && fieldValue.match(/^(?=.*[A-Za-z])(?=.*\d)[^]{8,16}$/)
        if (!checkResult) {
          setFormError((state) => ({ ...state, password: '密碼格式錯誤' }))
        }
        break
      default:
    }
    if (checkResult) {
      setFormError((state) => ({ ...state, [fieldName]: 'OK' }))
    }
  }

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  /* Get member data */
  async function getMemberProfile() {
    const url = 'http://localhost:3310/member/profile'
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth.token,
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    console.log(auth)
    console.log(data)

    if (data.body) {
      if (data.body.birthday) {
        data.body.birthday = moment(data.body.birthday).format('YYYY-MM-DD')
      } else {
        console.log('data.body.birthday : error')
      }
      setInputs({ ...formData, ...data.body })
    } else {
      console.log('data.body : error')
    }
  }

  /* Execute when init */
  useEffect(() => {
    if (auth) {
      getMemberProfile()
    }
  }, [auth])

  async function editMemberProfile() {
    let isPassCheck = true
    Object.keys(formData).forEach((fieldName) => {
      checkFormData(fieldName, formData[fieldName])
      if (
        isPassCheck &&
        formError[fieldName] &&
        formError[fieldName].indexOf('OK') === -1
      ) {
        isPassCheck = false
      } else {
        console.log('error')
      }
    })
    if (!isPassCheck) {
      if (formData.password.length <= 0) {
        ProfileAlert('更新失敗', '請輸入密碼', 'error', false, 1600)
      }
      console.log('Form verfify fail.')
      return
    }

    const url = 'http://localhost:3310/member/editprofile'

    const request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth.token,
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    function ProfileAlert(title, text, icon, showConfirmButton, timer) {
      const Swal = require('sweetalert2')
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showConfirmButton: showConfirmButton,
        timer: timer,
      })
    }

    if (data.result === '更新成功!') {
      setInputs((state) => ({ ...state, password: '' }))
      dispatch(updateAuth(data.body))
      ProfileAlert('更新成功', '會員資料更新成功', 'success', false, 1600)
      setFormError({ name: '', mobile: '', birthday: '', password: '' })
    } else if (data.result === '資料未更新!') {
      ProfileAlert('更新失敗', '無更新資料', 'warning', false, 1600)
      setFormError({ name: '', mobile: '', birthday: '', password: '' })
    } else {
      setFormError({ name: '', mobile: '', birthday: '', password: '' })
      ProfileAlert('更新失敗', '密碼錯誤', 'error', false, 1600)
    }
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
              會員資料
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <span className="mhead">Hello {auth.name} !</span>
          <ListGroup defaultActiveKey="./profile" className="mt-5">
            <ListGroup.Item action href="./profile">
              會員資料
            </ListGroup.Item>
            <ListGroup.Item action href="./password">
              密碼變更
            </ListGroup.Item>
            <ListGroup.Item action href="./order">
              訂單紀錄
            </ListGroup.Item>
            <ListGroup.Item action href="./coupon">
              我的優惠券
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col sm={12} md={8} lg={6} className="mx-auto">
          <span className="mhead">會員資料</span>
          <Form>
            <Form.Group className="m-5">
              <Form.Label className="form-label">會員姓名</Form.Label>
              <small
                className={
                  formError.name.indexOf('OK') > -1
                    ? 'successText'
                    : 'errorText'
                }
              >
                {formError.name}
              </small>
              <Form.Control
                type="text"
                className="primary-input"
                value={formData.name}
                onChange={onChangeForField('name')}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">手機號碼</Form.Label>
              <small
                className={
                  formError.mobile.indexOf('OK') > -1
                    ? 'successText'
                    : 'errorText'
                }
              >
                {formError.mobile}
              </small>
              <Form.Control
                type="text"
                className="primary-input"
                value={formData.mobile}
                onChange={onChangeForField('mobile')}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">出生日期</Form.Label>
              <small
                className={
                  formError.birthday.indexOf('OK') > -1
                    ? 'successText'
                    : 'errorText'
                }
              >
                {formError.birthday}
              </small>
              <Form.Control
                type="date"
                className="primary-input"
                value={formData.birthday}
                onChange={onChangeForField('birthday')}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label text-orange">
                請輸入原會員密碼以變更資料
              </Form.Label>
              <small
                className={
                  formError.password.indexOf('OK') > -1
                    ? 'successText'
                    : 'errorText'
                }
              >
                {formError.password}
              </small>
              <Form.Control
                type="password"
                className="primary-input"
                value={formData.password}
                onChange={onChangeForField('password')}
              />
              <div className="smalltext">
                <small></small>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                type="button"
                className="btn primary-btn md"
                onClick={() => {
                  editMemberProfile()
                }}
              >
                變更資料
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default MemberProfile
