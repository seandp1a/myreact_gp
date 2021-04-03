import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import SelectColor from '../components/SelectColor'
import SelectPhoneModel from '../components/SelectPhoneModel'

const SideBar = ({
  phoneModel,
  phoneColor,
  phoneColorsArr,
  setPhoneColor,
  shellRadioValue,
  setShellRadioValue,
  shellSeries,
  setShellSeries,
  seriesOptions,
  handleSelectPhoneModel,
}) => {
  // use react-router location for query strings
  const location = useLocation()
  const history = useHistory()

  const shellRadios = [
    { hex_color: '#000', color: 'black' },
    { hex_color: '#bfbfbf', color: 'silver' },
    { hex_color: '#fff', color: 'white' },
    { hex_color: '#485672', color: 'blue' },
    { hex_color: '#667262', color: 'green' },
    { hex_color: '#891515', color: 'red' },
    { hex_color: '#e9e400', color: 'yellow' },
  ]

  return (
    <div className="sidebar mt-4 px-3">
      <SelectPhoneModel
        phoneModel={phoneModel}
        handleSelectPhoneModel={handleSelectPhoneModel}
      />

      <div className="radio-block">
        <Form.Label className="products-item-title mt-3">手機顏色</Form.Label>
        <br />
        <SelectColor
          radioValue={phoneColor}
          setRadioValue={setPhoneColor}
          radios={phoneColorsArr}
        />
      </div>

      <Form>
        <Form.Label className="products-item-title mt-3">款式系列</Form.Label>
        <Form.Control
          className="primary-select"
          as="select"
          value={shellSeries}
          onChange={(e) => {
            setShellSeries(e.target.value)
            // this resets the page to 1
            history.push(`${location.pathname}?phone=${phoneModel}`)
          }}
        >
          <option value="all">---- 全部系列 ----</option>
          {seriesOptions}
        </Form.Control>
      </Form>

      <div className="radio-block">
        <Form.Label className="products-item-title mt-3">邊框顏色</Form.Label>
        <SelectColor
          radioValue={shellRadioValue}
          setRadioValue={setShellRadioValue}
          radios={shellRadios}
        />
      </div>
    </div>
  )
}

export default SideBar
