import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GuardProvider, GuardedRoute } from 'react-router-guards'

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

import MemberLogin from './pages/members/member_login'
import MemberRegister from './pages/members/member_register'
import MemberProfile from './pages/members/member_profile'

import Example from './pages/Example'
import NotFound from './pages/NotFound'

const checkToken = (to, from, next) => {
  if (to.meta.auth) {
    let token = sessionStorage.getItem('JWT_TOKEN')
    if (token && token.indexOf('Bearer') > -1) {
      next()
    } else {
      next.redirect('/member/login')
    }
  } else {
    next()
  }
}

function App() {
  const [mainBlur, SetMainBlur] = useState('0px')
  const dev = useSelector((state) => state.dev)

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <JNavbar SetMainBlur={SetMainBlur} dev={dev} />
        <JMainContent mainBlur={mainBlur}>
          <ScrollToTop>
            <GuardProvider guards={[checkToken]} error={NotFound}>
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
                <Route exact path="/member">
                  <MemberLogin />
                </Route>
                <Route
                  exact
                  path="/member/login"
                  component={MemberLogin}
                ></Route>
                <Route
                  exact
                  path="/member/register"
                  component={MemberRegister}
                ></Route>
                <GuardedRoute
                  exact
                  path="/member/profile"
                  component={MemberProfile}
                  meta={{ auth: true }}
                ></GuardedRoute>
                <Route path="/example">
                  <Example />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </GuardProvider>
          </ScrollToTop>
        </JMainContent>
        <JFooter />
      </>
    </Router>
  )
}

export default App
