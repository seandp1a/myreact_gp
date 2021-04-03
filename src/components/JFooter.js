import React from 'react'
import {} from 'react-bootstrap'
// import { NavLink } from "react-router-dom";

function JFooter() {
  const brand_line = '<use xlink:href="#brand-line"></use>'
  const brand_facebook = '<use xlink:href="#brand-facebook"></use>'
  const brand_instagram = '<use xlink:href="#brand-instagram"></use>'
  const brand_pinterest = '<use xlink:href="#brand-pinterest"></use>'
  const brand_twitter = '<use xlink:href="#brand-twitter"></use>'
  const brand_tiktok = '<use xlink:href="#brand-tiktok"></use>'
  const brand_youtube = '<use xlink:href="#brand-youtube"></use>'

  return (
    <>
      <footer>
        <div className="container pt-5">
          <div className="container pt-5">
            <div className="row pt-5">
              <div className="col mr-auto ml-auto row">
                <div className="col col-lg-2 col-md-4">
                  <span className="footer-title">支援服務</span>
                  <ul className="footer_ul_amrc">
                    <li>
                      <a href="http://webenlance.com">關於我們</a>
                    </li>
                    <li>
                      <a href="http://webenlance.com">部落格</a>
                    </li>
                    <li>
                      <a href="http://webenlance.com">影片教學</a>
                    </li>
                    <li>
                      <a href="http://webenlance.com">常見問題</a>
                    </li>
                    <li>
                      <a href="http://webenlance.com">退換貨須知</a>
                    </li>
                  </ul>
                </div>

                <div className="col col-lg-2 col-md-4">
                  <span className="footer-title">更多</span>
                  <ul className="footer_ul_amrc">
                    <li>
                      <a href="http://webenlance.com">人才招募</a>
                    </li>
                    <li>
                      <a href="http://webenlance.com">商店資訊</a>
                    </li>
                  </ul>
                </div>

                <div className="col col-lg-4 col-md-4">
                  <span className="footer-title">聯絡我們</span>
                  {/* headin5_amrc */}
                  <ul className="footer_ul_amrc">
                    <li>
                      客服服務時間
                      <br />
                      <span className="contact-detail">
                        週一至週五：10:00~18:00（假日及國定假日除外）
                      </span>
                    </li>
                    <li>
                      客服信箱
                      <br />
                      <span className="contact-detail">
                        service@ju4t.com.tw
                      </span>
                    </li>
                    <li>
                      客服電話
                      <br />
                      <span className="contact-detail">02-2654-0115</span>
                    </li>
                  </ul>
                </div>

                <div className="col col-lg-4 col-md-12">
                  <div className="brand-title">
                    <span className="footer-title">追蹤我們的社群</span>
                  </div>
                  <div className="d-flex footer-brand mt-4">
                    <a href="#/">
                      <svg dangerouslySetInnerHTML={{ __html: brand_line }} />
                    </a>
                    <a href="#/">
                      <svg
                        dangerouslySetInnerHTML={{ __html: brand_facebook }}
                      />
                    </a>
                    <a href="#/">
                      <svg
                        dangerouslySetInnerHTML={{ __html: brand_instagram }}
                      />
                    </a>
                    <a href="#/">
                      <svg
                        dangerouslySetInnerHTML={{ __html: brand_pinterest }}
                      />
                    </a>
                    <a href="#/">
                      <svg
                        dangerouslySetInnerHTML={{ __html: brand_twitter }}
                      />
                    </a>
                    <a href="#/">
                      <svg dangerouslySetInnerHTML={{ __html: brand_tiktok }} />
                    </a>
                    <a href="#/">
                      <svg
                        dangerouslySetInnerHTML={{ __html: brand_youtube }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col mr-auto ml-auto row pt-5">
            <div className="col final-row container d-flex justify-content-between">
              <div className="copyright">
                Copyright © 2021 JU4T .All rights reserved.
              </div>
              <ul className="footer-final-ul">
                <li>
                  <a href="#/">使用條款</a>
                </li>
                <li className="fakeline"></li>
                <li>
                  <a href="#/">隱私權聲明</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <svg display="none">
        <symbol
          id="brand-line"
          width="24.092"
          height="24.091"
          viewBox="0 0 24.092 24.091"
        >
          <path
            id="line-brands"
            d="M14.632,41.26v3.823a.17.17,0,0,1-.172.172h-.613a.178.178,0,0,1-.14-.07l-1.753-2.366v2.269a.17.17,0,0,1-.172.172h-.613A.17.17,0,0,1,11,45.089V41.265a.17.17,0,0,1,.172-.172h.608a.162.162,0,0,1,.14.075l1.753,2.366V41.265a.17.17,0,0,1,.172-.172h.613A.17.17,0,0,1,14.632,41.26Zm-4.41-.172H9.61a.17.17,0,0,0-.172.172v3.823a.17.17,0,0,0,.172.172h.613a.17.17,0,0,0,.172-.172V41.26A.173.173,0,0,0,10.223,41.088ZM8.744,44.293H7.071V41.26a.17.17,0,0,0-.172-.172H6.286a.17.17,0,0,0-.172.172v3.823a.158.158,0,0,0,.048.118.181.181,0,0,0,.118.048H8.738a.17.17,0,0,0,.172-.172v-.613A.172.172,0,0,0,8.744,44.293Zm9.115-3.205H15.4a.173.173,0,0,0-.172.172v3.823a.173.173,0,0,0,.172.172h2.458a.17.17,0,0,0,.172-.172V44.47a.17.17,0,0,0-.172-.172H16.186v-.645h1.672a.17.17,0,0,0,.172-.172v-.618a.17.17,0,0,0-.172-.172H16.186v-.645h1.672a.17.17,0,0,0,.172-.172V41.26A.181.181,0,0,0,17.859,41.088Zm6.233-4.695V51.736A4.38,4.38,0,0,1,19.7,56.091H4.356A4.384,4.384,0,0,1,0,51.7V36.356A4.384,4.384,0,0,1,4.393,32H19.736A4.38,4.38,0,0,1,24.092,36.393Zm-3.313,6.593c0-3.926-3.936-7.12-8.771-7.12s-8.771,3.194-8.771,7.12c0,3.517,3.119,6.464,7.335,7.023,1.027.22.909.6.678,1.979-.038.22-.177.866.758.473A28.345,28.345,0,0,0,18.9,47.369,6.353,6.353,0,0,0,20.779,42.986Z"
            transform="translate(0 -32)"
          />
        </symbol>

        <symbol
          id="brand-facebook"
          width="24.092"
          height="24.091"
          viewBox="0 0 24.092 24.091"
        >
          <path
            id="facebook-square-brands"
            d="M21.51,32H2.581A2.581,2.581,0,0,0,0,34.581V53.51a2.581,2.581,0,0,0,2.581,2.581H9.962V47.9H6.574V44.046H9.962V41.107c0-3.342,1.99-5.188,5.037-5.188a20.525,20.525,0,0,1,2.986.26v3.28H16.3a1.928,1.928,0,0,0-2.174,2.083v2.5h3.7L17.237,47.9H14.13v8.191H21.51a2.581,2.581,0,0,0,2.581-2.581V34.581A2.581,2.581,0,0,0,21.51,32Z"
            transform="translate(0 -32)"
          />
        </symbol>

        <symbol
          id="brand-instagram"
          width="24.105"
          height="24.1"
          viewBox="0 0 24.105 24.1"
        >
          <path
            id="instagram-brands"
            d="M11.98,37.7a6.179,6.179,0,1,0,6.179,6.179A6.169,6.169,0,0,0,11.98,37.7Zm0,10.2A4.017,4.017,0,1,1,16,43.875a4.024,4.024,0,0,1-4.017,4.017Zm7.873-10.449A1.441,1.441,0,1,1,18.412,36,1.438,1.438,0,0,1,19.853,37.443Zm4.092,1.463A7.132,7.132,0,0,0,22,33.856a7.179,7.179,0,0,0-5.05-1.947c-1.99-.113-7.953-.113-9.943,0a7.169,7.169,0,0,0-5.05,1.941A7.155,7.155,0,0,0,.01,38.9C-.1,40.89-.1,46.854.01,48.844a7.132,7.132,0,0,0,1.947,5.05,7.188,7.188,0,0,0,5.05,1.947c1.99.113,7.953.113,9.943,0A7.132,7.132,0,0,0,22,53.893a7.179,7.179,0,0,0,1.947-5.05C24.058,46.854,24.058,40.9,23.945,38.906ZM21.375,50.979a4.067,4.067,0,0,1-2.291,2.291c-1.586.629-5.351.484-7.1.484s-5.523.14-7.1-.484a4.067,4.067,0,0,1-2.291-2.291c-.629-1.586-.484-5.351-.484-7.1s-.14-5.523.484-7.1A4.067,4.067,0,0,1,4.876,34.48c1.586-.629,5.351-.484,7.1-.484s5.523-.14,7.1.484a4.067,4.067,0,0,1,2.291,2.291c.629,1.586.484,5.351.484,7.1S22,49.4,21.375,50.979Z"
            transform="translate(0.075 -31.825)"
          />
        </symbol>

        <symbol
          id="brand-pinterest"
          width="24.092"
          height="24.091"
          viewBox="0 0 24.092 24.091"
        >
          <path
            id="pinterest-square-brands"
            d="M24.092,34.581V53.51a2.582,2.582,0,0,1-2.581,2.581H8.3A13.779,13.779,0,0,0,9.777,52.9c.161-.618.823-3.141.823-3.141a3.531,3.531,0,0,0,3.028,1.516c3.985,0,6.851-3.662,6.851-8.212,0-4.361-3.56-7.625-8.142-7.625-5.7,0-8.722,3.823-8.722,7.991,0,1.936,1.033,4.345,2.678,5.114.253.118.382.065.441-.177.043-.183.269-1.081.366-1.495a.39.39,0,0,0-.091-.376,5.147,5.147,0,0,1-.984-3.011,5.716,5.716,0,0,1,5.964-5.732A5.215,5.215,0,0,1,17.5,43.126c0,3.571-1.8,6.044-4.152,6.044A1.921,1.921,0,0,1,11.4,46.783c.371-1.57,1.092-3.264,1.092-4.4,0-2.85-4.06-2.458-4.06,1.344a4.825,4.825,0,0,0,.393,1.963c-1.689,7.141-1.941,7.233-1.592,10.357l.118.043H2.581A2.582,2.582,0,0,1,0,53.51V34.581A2.582,2.582,0,0,1,2.581,32H21.51A2.582,2.582,0,0,1,24.092,34.581Z"
            transform="translate(0 -32)"
          />
        </symbol>

        <symbol
          id="brand-twitter"
          width="27.533"
          height="22.362"
          viewBox="0 0 27.533 22.362"
        >
          <path
            id="twitter-brands"
            d="M24.7,53.655c.017.245.017.489.017.734,0,7.46-5.678,16.055-16.055,16.055A15.947,15.947,0,0,1,0,67.911a11.673,11.673,0,0,0,1.363.07A11.3,11.3,0,0,0,8.368,65.57a5.653,5.653,0,0,1-5.276-3.913,7.116,7.116,0,0,0,1.066.087,5.968,5.968,0,0,0,1.485-.192,5.644,5.644,0,0,1-4.525-5.538v-.07a5.683,5.683,0,0,0,2.551.716,5.651,5.651,0,0,1-1.747-7.547,16.04,16.04,0,0,0,11.635,5.9,6.37,6.37,0,0,1-.14-1.293,5.648,5.648,0,0,1,9.766-3.861A11.11,11.11,0,0,0,26.765,48.5a5.628,5.628,0,0,1-2.481,3.11,11.313,11.313,0,0,0,3.249-.873,12.13,12.13,0,0,1-2.83,2.917Z"
            transform="translate(0 -48.082)"
          />
        </symbol>

        <symbol
          id="brand-tiktok"
          width="21.073"
          height="24.085"
          viewBox="0 0 21.073 24.085"
        >
          <path
            id="tiktok-brands"
            d="M21.2,9.877A9.884,9.884,0,0,1,15.425,8.03v8.409a7.648,7.648,0,1,1-6.6-7.579v4.23a3.511,3.511,0,1,0,2.458,3.349V0h4.141a5.7,5.7,0,0,0,.088,1.043h0a5.749,5.749,0,0,0,2.537,3.775,5.714,5.714,0,0,0,3.153.948Z"
            transform="translate(-0.128)"
          />
        </symbol>

        <symbol
          id="brand-youtube"
          width="29.369"
          height="20.65"
          viewBox="0 0 29.369 20.65"
        >
          <path
            id="youtube-brands"
            d="M43.688,67.231a3.69,3.69,0,0,0-2.6-2.613C38.8,64,29.617,64,29.617,64s-9.184,0-11.474.618a3.69,3.69,0,0,0-2.6,2.613,41.549,41.549,0,0,0,0,14.23,3.635,3.635,0,0,0,2.6,2.572c2.29.618,11.474.618,11.474.618s9.184,0,11.474-.618a3.635,3.635,0,0,0,2.6-2.572,41.549,41.549,0,0,0,0-14.23ZM26.614,78.713V69.979l7.676,4.367Z"
            transform="translate(-14.933 -64)"
          />
        </symbol>
      </svg>
    </>
  )
}
export default JFooter
