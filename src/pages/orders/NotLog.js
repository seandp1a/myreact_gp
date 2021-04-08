import { withRouter, Link } from 'react-router-dom'
import OrderStep0 from './OrderStep0'

function NotLog(props) {
  const icon_cross = props.icon_cross
  const { cartList, Add_Minus } = props
  if (cartList == 0) {
    return <OrderStep0 />
  }
  return (
    <>
      <div className="d-flex align-items-end">
        <h1 className="col-6 pl-0 text-left mb-0">您的購物車</h1>
        <h2 className="col-2 text-left mb-0">金額</h2>
        <h2 className="col-1 mb-0">&nbsp;</h2>
        <h2 className="col-3 text-center mb-0">合計</h2>
      </div>
      <hr className="myhr1" />

      <div className="d-flex flex-column cart-div">
        {cartList.map((v, i) => {
          const imgModel = v.phoneModel.replaceAll(' ', '-')
          const imgSmodel = imgModel
            .replaceAll('Phone-', '')
            .replaceAll(' ', '-')
          const imgSeries = v.series_name_eng.replaceAll(' ', '-')
          const imgDesign = v.design_name_eng.replaceAll(' ', '-')
          return (
            <div
              className="d-flex align-items-center my-2 carts "
              id={`cart-item${i}`}
            >
              <div className="col-2 order-product-pic position-relative">
                <img
                  src={`/myreact_gp/img/products/phones/${imgModel}/${imgSmodel}-${v.phoneColor}.png`}
                  className="position-absolute"
                  alt=""
                />
                <img
                  src={
                    v.series_id === 16
                      ? `/myreact_gp/img/products/uploads/${v.file_name}.png`
                      : `/myreact_gp/img/products/series/${imgSeries}/${imgDesign}.png`
                  }
                  className="position-absolute"
                  alt=""
                />
                <img
                  src={`/myreact_gp/img/products/shells/shell-${v.shell_color_en}.png`}
                  className="position-absolute"
                  alt=""
                />
                <img
                  src={`/myreact_gp/img/products/phones/${imgModel}/${imgSmodel}-cam-${v.phoneColor}.png`}
                  className="position-absolute"
                  alt=""
                />
              </div>
              <div className="item-name col-4">
                <h4>{v.phoneModel} - JU4T 防摔殼</h4>
                <h4>
                  {v.series_name_chn + '系列'} - {v.design_name_chn}
                </h4>
              </div>
              <div className="col-1">
                <h4 className="mb-0">${v.price}&nbsp;&nbsp;TWD</h4>
              </div>

              <div className="counter d-flex align-items-center justify-content-center col-3 px-0">
                <h3 className="mb-0">{v.quantity}</h3>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <h4 className="mb-0">${v.price * v.quantity}&nbsp;&nbsp;TWD</h4>
                <button className="btn btn-sm cross-btn ml-auto d-md-none">
                  <svg
                    style={{ width: '20px', height: '20px' }}
                    dangerouslySetInnerHTML={{ __html: icon_cross }}
                  />
                </button>
                <Link
                  className="cross-icon ml-auto d-none d-md-block"
                  onClick={(e) => {
                    e.preventDefault()
                    Add_Minus(i, 'del-fetch')
                  }}
                >
                  <svg
                    style={{ width: '20px', height: '20px' }}
                    dangerouslySetInnerHTML={{ __html: icon_cross }}
                  />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <hr className="myhr2" />

      <div className="text-center my-5">
        <button
          className="btn important-btn md mx-auto "
          onClick={() => {
            props.history.push('/member/login')
          }}
        >
          來去結帳
        </button>
      </div>
    </>
  )
}
export default withRouter(NotLog)
