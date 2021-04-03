import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import { HiOutlinePencil } from 'react-icons/hi'

const CustomizeTextBlock = ({
  text,
  setText,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  fontSize,
  setFontSize,
}) => {
  const fonts = [
    'Roboto',
    'Calibri',
    'Arial',
    'Kalam',
    'Dancing Script',
    'Times New Roman',
    'Cambria',
    'Noto Sans TC',
    '標楷體',
    '新細明體',
  ]
  const fontsMap = fonts.map((font) => (
    <option
      key={font}
      value={font}
      ref={(node) => {
        if (node) node.style.setProperty('font-family', font, 'important')
      }}
    >
      {font}
    </option>
  ))

  return (
    <>
      <Form.Label className="products-item-title mt-3">
        客製文字
        <HiOutlinePencil
          style={{ verticalAlign: 'text-top', marginLeft: '5px' }}
        />
      </Form.Label>

      <Form id="createCustomText">
        <Form.Group as={Row}>
          <Form.Label column sm={2} style={{ paddingRight: 0 }}>
            文字
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              className="primary-input"
              type="text"
              placeholder="請輸入文字"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} style={{ paddingRight: 0 }}>
            顏色
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="color"
              className="color-selector"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} style={{ paddingRight: 0 }}>
            字體
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              className="primary-select"
              as="select"
              onChange={(e) => setFontFamily(e.target.value)}
              ref={(node) => {
                if (node)
                  node.style.setProperty('font-family', fontFamily, 'important')
              }}
            >
              {fontsMap}
            </Form.Control>
          </Col>
          <Col sm={4} className="mt-2 mt-sm-0 pl-md-0">
            <Form.Control
              className="primary-select"
              as="select"
              onChange={(e) => setFontWeight(e.target.value)}
              style={{ fontWeight: fontWeight }}
            >
              <option value="500">正常</option>
              <option value="700" style={{ fontWeight: 700 }}>
                粗體
              </option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} style={{ paddingRight: 0 }}>
            大小
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="range"
              min="10"
              max="100"
              className="mt-2"
              value={fontSize}
              onChange={(e) => {
                setFontSize(+e.target.value)
              }}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default CustomizeTextBlock
