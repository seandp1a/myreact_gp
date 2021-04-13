import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FuncList from '../components/FuncList'
import moment from 'moment'
import '../members.scss'
// import { table, thead, tbody, tr, th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const MemberOrder = (props) => {
  const auth = useSelector((state) => state.auth)
  const [orderList, setOrderList] = useState([])

  /* Execute when init */
  useEffect(() => {
    if (auth) {
      getMemberOrderList()
    }
  }, [auth])

  /* Get member coupon */
  async function getMemberOrderList() {
    const List = JSON.parse(localStorage.getItem('OrderList'))
    console.log(List, auth)
    let tempList = []
    List.forEach((v) => {
      if (v.member_id === auth.sid) {
        tempList.push(v)
      }
    })
    if (tempList.length > 0) {
      setOrderList(tempList)
    }
  }

  const OrderTalbeTr = orderList.map((order, index) => {
    let orderStatus = ''
    if (order.status === '1') {
      orderStatus = '未出貨'
    } else if (order.status === '2') {
      orderStatus = '已出貨'
    } else {
      orderStatus = '已棄單'
    }
    return (
      <tr key={'everyOrder' + index}>
        <td>{order.unique_id}</td>
        <td>{order.created_at}</td>
        <td>$&nbsp;{order.price}&nbsp;&nbsp;TWD</td>
        <td>{orderStatus}</td>
        <td>
          <Link to={'/member/orderdetail/' + order.unique_id}>查看明細</Link>
        </td>
      </tr>
    )
  })

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
              訂單紀錄
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <FuncList authName={auth.name} DK={'./order'} />
        </Col>
        <Col sm={12} md={9} lg={6} className="mx-auto">
          <span className="mhead">訂單紀錄</span>
          <Table striped bordered hover className="mt-5 mtext">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>訂購日期</th>
                <th>訂購總額</th>
                <th>訂單狀態</th>
                <th>訂單明細</th>
              </tr>
            </thead>
            <tbody>{OrderTalbeTr}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default MemberOrder
