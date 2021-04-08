import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { updateAuth, setAuth } from '../../../actions/authAction'
import { Link, withRouter } from 'react-router-dom'
import FuncList from '../components/FuncList'

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

  const [UD, setUD] = useState({})

  /* Get member data */
  function getMemberProfile() {
    let userData = {}
    JSON.parse(localStorage.getItem('LocalAccount')).forEach((v) => {
      if (v.sid === auth.sid) {
        userData = {
          name: v.name,
          birthday: v.birthday,
          mobile: v.mobile,
        }
        setUD(v)
      }
    })
    // console.log(userData)

    if (userData) {
      if (userData.birthday) {
        userData.birthday = moment(userData.birthday).format('YYYY-MM-DD')
      } else {
        console.log('userData.birthday : error')
      }

      setInputs({ ...formData, ...userData })
    } else {
      console.log('userData : error')
    }
  }

  /* Execute when init */
  useEffect(() => {
    if (auth) {
      // console.log(auth)
      getMemberProfile()
    }
  }, [auth])

  const HandleUpdate = (fd, ud) => {
    if (fd.password !== ud.password) {
      const result = { result: '密碼錯誤!' }
      return result
    } else {
      if (
        fd.name === ud.name &&
        fd.mobile === ud.mobile &&
        fd.birthday === ud.birthday
      ) {
        const result = { result: '資料未更新!' }
        return result
      } else {
        ud.name = fd.name
        ud.mobile = fd.mobile
        ud.birthday = fd.birthday

        const result = { result: '更新成功!', body: ud }
        const tempArr = JSON.parse(localStorage.getItem('LocalAccount'))
        tempArr.forEach((v) => {
          if (v.sid === ud.sid) {
            v.name = ud.name
            v.mobile = ud.mobile
            v.birthday = ud.birthday
          }
        })
        localStorage.setItem('LocalAccount', JSON.stringify(tempArr))
        const jwt = require('jsonwebtoken')
        let token = jwt.sign(ud, 'ju4t', { expiresIn: '1d' })
        let newToken = 'Bearer ' + token

        dispatch(setAuth(newToken))
        return result
      }
    }
  }

  function editMemberProfile() {
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

    const data = HandleUpdate(formData, UD)

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
              <Link to="/#">首頁</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/member/profile">會員中心</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              會員資料
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <FuncList authName={auth.name} DK={'./profile'} />
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

export default withRouter(MemberProfile)
