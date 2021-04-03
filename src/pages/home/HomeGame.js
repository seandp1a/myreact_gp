import React from 'react'
import { Link } from 'react-router-dom'

function HomeGame(props) {
  return (
    <>
      <div className="game-container container mb-2 mt-5">
        <div className="game">
          <div className="game-img text-center">
            <div className="front-img">
              <img src={`./${props.myurl}img/home/game.png`} alt="" />
            </div>
            <div className="back-img">
              <img src={`./${props.myurl}img/home/game.png`} alt="" />
            </div>
          </div>
          <div className="game-txt text-center">
            <h1>期間限定活動</h1>
            <p className="">註冊會員玩小遊戲就有機會獲得好禮</p>
            <Link to="/gameindex">
              <button className="btn important-btn md">翻好禮去</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomeGame
