import { Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import './order-content.scss'
function OrderStep0(props) {
  return (
    <>
      <Container className="order-content">
        <div className="d-flex align-items-end">
          <h1 className="col-6 pl-0 text-left mb-0">您的購物車</h1>
          <h2 className="col-2 text-left mb-0">金額</h2>
          <h2 className="col-1 mb-0">&nbsp;</h2>
          <h2 className="col-3 text-center mb-0">合計</h2>
        </div>
        <hr className="myhr1" />
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="/myreact_gp/img/components/OHYA.png"
            alt=""
            className="mr-5 order-banner-img"
          />
          <div className="ml-5">
            <h1 style={{ fontWeight: 700 }}>您的購物車內無商品！</h1>
            <button
              className=" gogogo btn primary-btn lg mt-5 "
              onClick={() => {
                props.history.push('/products?phone=iPhone-12-Pro-Max')
              }}
            >
              來去購物GOGOGO!
            </button>
          </div>
        </div>
        <hr className="myhr2" />
      </Container>
    </>
  )
}
export default withRouter(OrderStep0)
