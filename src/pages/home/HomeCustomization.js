import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect} from 'react';

function HomeCustomization() {
  useEffect(() => {
    AOS.init({
      duration : 1200
    });
  }, []);

  return (
    <>
      <div className="custom-bg">
            <div className="container mt-5 mb-5 custom-item">
              <h1 className="title mb-5 mt-5">3步驟簡單打造<br/>屬於你的殼</h1>

                <div className="container custom-container mb-5">
                  <div className="custom-item-right d-flex">
                      <div className="custom-item-image item1" data-aos="fade-right">
                      </div>
                      <div className="item_info">
                        <span className="item-title">1.選擇裝置</span>
                        <div className="item_location">
                          我們擁有許多不同裝置的樣式<br/>
                          請先選擇您在使用的裝置
                        </div>
                      </div>
                  </div>

                  <div className="custom-item-right d-flex mt-5 mb-5 justify-content-end">
                      <div className="custom-item-image item2 order-2" data-aos="fade-left">
                      </div>
                      <div className="item_info-right">
                        <span className="item-title">2.上傳設計</span>
                        <div className="item_location-right order-1">
                          上傳照片或是設計<br/>
                          也可以寫下一段能代表你的文字<br/>
                          發會自己的創造力 
                        </div>
                      </div>
                      
                  </div>

                  <div className="custom-item-right d-flex">
                      <div className="custom-item-image item3" data-aos="fade-right">
                      </div>
                      <div className="item_info">
                        <span className="item-title">3.確認設計</span>
                        <div className="item_location">
                          確認上傳的設計圖檔是否正確後<br/>
                          接著就可以把訂單送出囉！<br/>
                        </div>
                      </div>
                  </div>
                  
                  <h1 className="title-txt mb-3 text-center" data-aos="slide-up">專屬你的配件由你打造</h1>

                  <div className="custom-item-right d-flex mt-5 mb-5 justify-content-center" data-aos="zoom-in">
                      <Link Link to="/customize/step-one">
                      <button className="btn primary-btn md">打造你的殼</button>
                      </Link>
                  </div>

                </div>    
            </div>
      </div>
    </>
  );
}
export default HomeCustomization;
