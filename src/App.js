import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import JNavbar from './components/JNavbar'
import JMainContent from './components/JMainContent'
import JFooter from './components/JFooter'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/home'

import ProductsList from './pages/products/products_list'
import ProductDetails from './pages/products/product_details'
import CustomizeStepOne from './pages/products/customize_step_one'
import CustomizeStepTwo from './pages/products/customize_step_two'
import CustomizeStepThree from './pages/products/customize_step_three'

import Example from './pages/Example'
import NotFound from './pages/NotFound'

function App() {
  const [mainBlur, SetMainBlur] = useState('0px')
  const dev = useSelector((state) => state.dev)

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <JNavbar SetMainBlur={SetMainBlur} dev={dev} />
        <JMainContent mainBlur={mainBlur}>
          <ScrollToTop>
            <Switch>
              <Route exact path="/">
                <Home dev={dev} />
              </Route>
              <Route exact path="/products">
                <ProductsList dev={dev} />
              </Route>
              <Route exact path="/products/details/:phoneModel/:designId">
                <ProductDetails dev={dev} />
              </Route>
              <Route exact path="/customize">
                <Redirect to="/customize/step-one" />
              </Route>
              <Route exact path="/customize/step-one">
                <CustomizeStepOne dev={dev} />
              </Route>
              <Route exact path="/customize/step-two">
                <CustomizeStepTwo dev={dev} />
              </Route>
              <Route exact path="/customize/step-three">
                <CustomizeStepThree dev={dev} />
              </Route>
              <Route path="/example">
                <Example />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </ScrollToTop>
        </JMainContent>
        <JFooter />
      </>
    </Router>
  )
}

export default App
