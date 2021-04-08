import { Link } from 'react-router-dom'
function CartList(props) {
  const { icon_cross, icon_minus, icon_add } = props
  const { HandleAmount, Add_Minus, v, i } = props
  const imgModel = v.phoneModel.replaceAll(' ', '-')
  const imgSmodel = imgModel.replaceAll('Phone-', '').replaceAll(' ', '-')
  const imgSeries = v.series_name_eng.replaceAll(' ', '-')
  const imgDesign = v.design_name_eng.replaceAll(' ', '-')

  // console.log(imgModel, imgSmodel,imgSeries,imgDesign);
  return (
    <div className="d-flex align-items-center my-2 carts" id={`cart-item${i}`}>
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
        <button
          className="btn btn-sm"
          onClick={() => {
            Add_Minus(i, 'minus')
          }}
        >
          <svg
            style={{ width: '20px', height: '20px' }}
            dangerouslySetInnerHTML={{ __html: icon_minus }}
          />
        </button>
        <input
          type="number"
          className="form-control counter-input"
          value={v.quantity}
          onChange={(e) => {
            HandleAmount(i, v, e)
          }}
        />
        <button
          className="btn btn-sm"
          onClick={() => {
            Add_Minus(i, 'add')
          }}
        >
          <svg
            style={{ width: '20px', height: '20px' }}
            dangerouslySetInnerHTML={{ __html: icon_add }}
          />
        </button>
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
          to="/"
        >
          <svg
            style={{ width: '20px', height: '20px' }}
            dangerouslySetInnerHTML={{ __html: icon_cross }}
          />
        </Link>
      </div>
    </div>
  )
}
export default CartList
