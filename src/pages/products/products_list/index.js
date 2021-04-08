import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import queryString from 'query-string'

import './0_products_list.scss'
import ProductsBanner from './ProductsBanner'
import SideBar from './SideBar'
import ProductsGrid from './ProductsGrid'

const ProductsList = (props) => {
  const myurl = props.dev ? 'myreact_gp/' : ''
  const myjson = props.dev
    ? 'http://localhost:3000/myreact_gp/data/phone_data.json'
    : 'https://seandp1a.github.io/myreact_gp/data/phone_data.json'
  // use react-router location for query strings
  const location = useLocation()
  const history = useHistory()
  const parsed = queryString.parse(location.search)

  // for pagnination
  const itemsPerPage = 16

  // state for selected sort (by hot or new)
  const [selectedSort, setSelectedSort] = useState('hot')

  // state for selected phone model
  const [phoneModel, setPhoneModel] = useState(parsed.phone)

  // state for selected phone color
  const [phoneColor, setPhoneColor] = useState('')

  // state to store the phone color options to render (color options differ for each phone model)
  // this is not set to an empty array to prevent the error of "Cannot read property 'color' of undefined"
  const [phoneColorsArr, setPhoneColorsArr] = useState([
    { color: '', hex_color: '', model_id: '' },
  ])

  // state for selected series
  const [shellSeries, setShellSeries] = useState('all')

  // state to store the series options to render (series availability differs for each phone model)
  const [seriesArr, setSeriesArr] = useState([])

  // state for selected phone shell radio button
  const [shellRadioValue, setShellRadioValue] = useState('black')

  // state to store total items count, current page, and total pages for pagnination
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(parsed.page ? +parsed.page : 1)
  const [totalPages, setTotalPages] = useState(1)

  // state to store products list to render
  const [productsDisplayArr, setProductsDisplayArr] = useState([])

  // onchange handler for SelectPhoneModel
  const handleSelectPhoneModel = (e) => {
    setPhoneModel(e.target.value)

    // reset selected series to all
    setShellSeries('all')

    // change the phone model value in the query string
    history.push(`${location.pathname}?phone=${e.target.value}`)
  }

  // series options to render in dropdown
  const seriesOptions = seriesArr.map((item) => (
    <option key={item.id} value={item.id}>
      {item.series_name_chn}
    </option>
  ))

  // OK change the phone color options when the selected phone model changes
  useEffect(() => {
    const phoneModelName = phoneModel.replaceAll('-', ' ')

    fetch(myjson)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        const model_id = handleModel(phoneModelName, data[0].data)
        if (model_id != 0) {
          const temp = handleColor(model_id, data[5].data)
          setPhoneColorsArr(temp)
        }
      })
    // fetch the phone color options for the selected phone model
  }, [phoneModel])

  // OK change series dropdown options according to phone selected value
  useEffect(() => {
    const phoneModelName = phoneModel.replaceAll('-', ' ')
    fetch(myjson)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        const model_id = handleModel(phoneModelName, data[0].data)
        if (model_id != 0) {
          const temp = handleSeries(model_id, data[4].data, data[1].data)
          setSeriesArr(temp)
        }
      })
  }, [phoneModel])

  // set the default selected phone color to the first one
  // this has to be tied with phoneColorsArr in useEffect and not phoneModel because I tried to tie it to the phoneModel useEffect and it didn't work
  useEffect(() => {
    setPhoneColor(phoneColorsArr[0].color)
  }, [phoneColorsArr])

  // update page state according when the url query string page changes
  useEffect(() => {
    setPage(parsed.page ? +parsed.page : 1)
  }, [parsed.page])

  const handleSeries = (modelId, pmsArr, seriesArr) => {
    const tempArr = []
    const finalArr = []
    for (const v of pmsArr) {
      if (v.model_id === modelId) {
        tempArr.push(v.series_id)
      }
    }
    tempArr.forEach((id) => {
      for (const v of seriesArr) {
        if (v.id === id) {
          finalArr.push({ id: v.id, series_name_chn: v.series_name_chn })
        }
      }
    })
    return finalArr
  }

  const handleColor = (modelId, pmcArr) => {
    const tempArr = []
    for (const v of pmcArr) {
      if (v.model_id === modelId) {
        tempArr.push({
          color: v.color,
          hex_color: v.hex_color,
          model_id: v.model_id,
        })
      }
    }
    return tempArr
  }

  const handleModel = (modelName, modelArr) => {
    for (const v of modelArr) {
      if (v.model === modelName) {
        // console.log(v.id, v.model)
        return v.id
      }
    }
  }

  const handleDisplay = (
    modelId,
    pmsArr,
    seriesArr,
    designArr,
    shellSeries
  ) => {
    const tempArr = []
    const finalArr = []
    if (shellSeries === 'all') {
      for (const v of pmsArr) {
        if (v.model_id === modelId) {
          tempArr.push(v.series_id)
        }
      }
    } else {
      tempArr.push(shellSeries)
    }

    tempArr.forEach((id) => {
      for (const S of seriesArr) {
        if (id === S.id) {
          for (const D of designArr) {
            if (D.series_id === S.id && S.id != 16) {
              finalArr.push({
                series_id: S.id,
                series_name_chn: S.series_name_chn,
                series_name_eng: S.series_name_eng,
                price: S.price,
                phone_design_id: D.id,
                design_name_chn: D.design_name_chn,
                design_name_eng: D.design_name_eng,
                popularity: D.popularity,
                created_date: D.created_date,
              })
            }
          }
        }
      }
    })
    if (selectedSort === 'hot') {
      finalArr.sort((a, b) => {
        return a.popularity < b.popularity ? 1 : -1
      })
    } else {
      finalArr.sort((a, b) => {
        return a.created_date < b.created_date ? 1 : -1
      })
    }
    return finalArr
  }

  useEffect(() => {
    const parsed = queryString.parse(location.search)
    const phoneModelName = phoneModel.replaceAll('-', ' ')

    setPhoneModel(parsed.phone)

    fetch(myjson)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        const model_id = handleModel(phoneModelName, data[0].data)
        if (model_id != 0) {
          const temp = handleDisplay(
            model_id,
            data[4].data,
            data[1].data,
            data[2].data,
            shellSeries
          )
          // console.log(temp)
          setTotalItems(temp.length)
          setTotalPages(Math.ceil(temp.length / itemsPerPage))

          setProductsDisplayArr(temp)
        }
      })
  }, [location.search, phoneModel, shellSeries, selectedSort])

  return (
    <>
      <Container className="products-list mb-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            產品
          </li>
        </ol>
        <ProductsBanner />
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <SideBar
              phoneModel={phoneModel}
              setPhoneModel={setPhoneModel}
              phoneColor={phoneColor}
              phoneColorsArr={phoneColorsArr}
              setPhoneColor={setPhoneColor}
              shellRadioValue={shellRadioValue}
              setShellRadioValue={setShellRadioValue}
              shellSeries={shellSeries}
              setShellSeries={setShellSeries}
              seriesOptions={seriesOptions}
              handleSelectPhoneModel={handleSelectPhoneModel}
            />
          </Col>
          <Col sm={12} md={6} lg={8} xl={9}>
            <ProductsGrid
              productsDisplayArr={productsDisplayArr.filter((item, index) => {
                return (
                  index >= itemsPerPage * (page - 1) &&
                  index < itemsPerPage * page
                )
              })}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              phoneModel={phoneModel}
              phoneColor={phoneColor}
              shellRadioValue={shellRadioValue}
              totalItems={totalItems}
              startItem={itemsPerPage * (page - 1) + 1}
              endItem={page === totalPages ? totalItems : itemsPerPage * page}
              page={page}
              totalPages={totalPages}
              myurl={myurl}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductsList
