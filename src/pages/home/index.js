import React from 'react'
// import {  } from "react-bootstrap";
import './home-content.scss'
// import HomeBanner from "./HomeBanner";
import NewHomeBanner from './NewHomeBanner'
import HomeAboutUs from './HomeAboutUs'
import HomeProductFeature from './HomeProductFeature'
import HomeCustomization from './HomeCustomization'
import HomeProduct from './HomeProduct'
import HomeSocial from './HomeSocial'
import HomeGame from './HomeGame'

const Home = (props) => {
  const dev = props.dev
  const myurl = dev ? 'myreact_gp/' : ''
  return (
    <>
      <div className="home-content mb-5">
        <NewHomeBanner myurl={myurl} />
        {/* <HomeBanner/> */}
        <HomeAboutUs myurl={myurl} />
        <HomeProductFeature myurl={myurl} />
        <HomeCustomization />
        <HomeProduct myurl={myurl} />
        <HomeSocial myurl={myurl} />
        <HomeGame myurl={myurl} />
      </div>
    </>
  )
}

export default Home
