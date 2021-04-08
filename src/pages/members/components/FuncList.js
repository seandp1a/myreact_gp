import { ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
const FuncList = (props) => {
  const history = useHistory()
  const handlePUSH = (path) => {
    setTimeout(() => {
      history.push(path)
    }, 500)
  }
  return (
    <>
      <span className="mhead">Hello {props.authName} !</span>
      <ListGroup defaultActiveKey={props.DK} className="mt-5">
        <ListGroup.Item
          action
          href="./profile"
          onClick={(e) => {
            e.preventDefault()

            handlePUSH('./profile')
          }}
        >
          會員資料
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="./password"
          onClick={(e) => {
            e.preventDefault()

            handlePUSH('./password')
          }}
        >
          密碼變更
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="./order"
          onClick={(e) => {
            e.preventDefault()
            handlePUSH('./order')
          }}
        >
          訂單紀錄
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="./coupon"
          onClick={(e) => {
            e.preventDefault()
            handlePUSH('./coupon')
          }}
        >
          我的優惠券
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
export default FuncList
