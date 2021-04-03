import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Product from './Product'
import ProductsPagination from './ProductsPagination'

const ProductsGrid = ({
  productsDisplayArr,
  setSelectedSort,
  phoneModel,
  phoneColor,
  shellRadioValue,
  totalItems,
  startItem,
  endItem,
  page,
  totalPages,
  myurl,
}) => {
  // render products dynamically through the productsDisplayArr state from parent element
  const productsDisplay = productsDisplayArr.map((item) => {
    // dynamically generate file path for images
    const img_series_name = item.series_name_eng.replaceAll(' ', '-')
    const img_design_name = item.design_name_eng.replaceAll(' ', '-')
    const filepath = `./img/products/series/${img_series_name}/${img_design_name}.png`

    return (
      <Product
        key={item.phone_design_id}
        src={filepath}
        alt={item.design_name_chn}
        seriesTitle={item.series_name_chn}
        designTitle={item.design_name_chn}
        price={item.price}
        phoneModel={phoneModel}
        phoneColor={phoneColor}
        shellRadioValue={shellRadioValue}
        designId={item.phone_design_id}
        myurl={myurl}
      />
    )
  })

  return (
    <div className="products-grid mt-4">
      <Row className="top-sort-bar mt-3 pt-2" style={{ marginRight: 0 }}>
        <Col xs={12} sm={4}>
          <Form className="pl-2">
            <Form.Control
              as="select"
              onChange={(e) => {
                setSelectedSort(e.target.value)
              }}
            >
              <option value="hot">熱門排序</option>
              <option value="new">新產品排序</option>
            </Form.Control>
          </Form>
        </Col>
        <Col xs={12} sm={8}>
          <p className="mt-2 text-right">
            顯示 第{startItem}-{endItem} 項商品，共{totalItems}項商品
          </p>
        </Col>
      </Row>
      <Row className="product-row d-flex justify-content-center">
        {productsDisplay}
      </Row>

      <Row className="d-flex justify-content-center mt-5">
        <ProductsPagination page={page} totalPages={totalPages} />
      </Row>
    </div>
  )
}

export default ProductsGrid
