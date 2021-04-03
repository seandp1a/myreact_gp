import React, { useLayoutEffect, useState } from 'react'
import queryString from 'query-string'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Form, Col } from 'react-bootstrap'
import {
  BiFirstPage,
  BiLastPage,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi'

// this function is to use media queries to detect screen size changes
function useMediaQuery() {
  const [screenSize, setScreenSize] = useState([0, 0])

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return screenSize
}

// pagnation rendering will be changed according to screen size
// window size width < 490px will show mobile pagnation version
const ProductsPagination = ({ page, totalPages }) => {
  const location = useLocation()
  const history = useHistory()
  const parsed = queryString.parse(location.search)

  let pagesCountArr = []
  for (let i = 1; i <= totalPages; i++) {
    pagesCountArr.push(i)
  }

  const [width] = useMediaQuery()

  const desktopPagination = (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${page === 1 && 'disabled'}`}>
          <Link
            className="page-link"
            to={`/products?phone=${parsed.phone}&page=1`}
          >
            <BiFirstPage />
          </Link>
        </li>
        <li className={`page-item ${page === 1 && 'disabled'} mr-2`}>
          <Link
            className="page-link"
            to={`/products?phone=${parsed.phone}&page=${page - 1}`}
          >
            <BiChevronLeft />
          </Link>
        </li>

        {page - 2 > 0 && (
          <li className="page-item">
            <Link
              className="page-link"
              to={`/products?phone=${parsed.phone}&page=${page - 1}`}
            >
              {page - 2}
            </Link>
          </li>
        )}
        {page - 1 > 0 && (
          <li className="page-item">
            <Link
              className="page-link"
              to={`/products?phone=${parsed.phone}&page=${page - 1}`}
            >
              {page - 1}
            </Link>
          </li>
        )}
        <li className="page-item active">
          <Link
            className="page-link"
            to={`/products?phone=${parsed.phone}&page=${page}`}
          >
            {page}
          </Link>
        </li>
        {page + 1 <= totalPages && (
          <li className="page-item">
            <Link
              className="page-link"
              to={`/products?phone=${parsed.phone}&page=${page + 1}`}
            >
              {page + 1}
            </Link>
          </li>
        )}
        {page + 2 <= totalPages && (
          <li className="page-item">
            <Link
              className="page-link"
              to={`/products?phone=${parsed.phone}&page=${page + 2}`}
            >
              {page + 2}
            </Link>
          </li>
        )}

        <li className={`page-item ${page === totalPages && 'disabled'} ml-2`}>
          <Link
            className="page-link"
            to={`/products?phone=${parsed.phone}&page=${page + 1}`}
          >
            <BiChevronRight />
          </Link>
        </li>
        <li className={`page-item ${page === totalPages && 'disabled'}`}>
          <Link
            className="page-link"
            to={`/products?phone=${parsed.phone}&page=${totalPages}`}
          >
            <BiLastPage />
          </Link>
        </li>
      </ul>
    </nav>
  )

  const mobilePagination = (
    <div>
      <Form inline>
        <Form.Group as={Col}>
          <Form.Control
            className="select-box mobile-page-select"
            as="select"
            onChange={(e) => {
              // change the page value in the query string
              history.push(
                `${location.pathname}?phone=${parsed.phone}&page=${e.target.value}`
              )
            }}
          >
            {pagesCountArr.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Label className="mb-3 px-2 py-1 mobile-total-pages">
          /&ensp;{totalPages}
        </Form.Label>
      </Form>
    </div>
  )

  return <>{width < 490 ? mobilePagination : desktopPagination}</>
}

export default ProductsPagination
