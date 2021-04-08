function CartCheck(props) {
  const { v } = props
  const imgModel = v.phoneModel.replaceAll(' ', '-')
  const imgSmodel = imgModel.replaceAll('Phone-', '').replaceAll(' ', '-')
  const imgSeries = v.series_name_eng.replaceAll(' ', '-')
  const imgDesign = v.design_name_eng.replaceAll(' ', '-')
  return (
    <div className="d-flex align-items-center my-2">
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
        <h4 className="mb-0">
          {`$${v.price} `}
          {` TWD`}
        </h4>
      </div>

      <div className="counter d-flex align-items-center justify-content-center col-3 px-0">
        <h3 className="mb-0">{v.quantity}</h3>
      </div>
      <div className="col-2 d-flex align-items-center ">
        <h4 className="mb-0">
          {`$${v.price * v.quantity} `}
          {` TWD`}
        </h4>
      </div>
    </div>
  )
}
export default CartCheck
