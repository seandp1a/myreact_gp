function Example() {
  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#1">首頁</a>
            </li>
            <li className="breadcrumb-item active">
              <a href="#1">AAA</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              當前頁面 class要加 active
            </li>
          </ol>
        </nav>
        麵包屑▲
        <hr className="myhr1" />
        閃電分隔線▲▼
        <hr className="myhr2" />
        普通分隔線▼
        <hr className="calc-hr" />
        <div className="d-flex justify-content-between my-2">
          <button className="btn primary-btn lg">大按鈕</button>
          <button className="btn primary-btn md">中按鈕</button>
          <button className="btn primary-btn sm">小按鈕</button>
        </div>
        <div className="d-flex justify-content-between my-2">
          <button className="btn important-btn lg">大按鈕</button>
          <button className="btn important-btn md">中按鈕</button>
          <button className="btn important-btn sm">小按鈕</button>
        </div>
        <div className="d-flex justify-content-between my-2">
          <h3 className="primary-text">primary-text</h3>
          <h3 className="danger-text">danger-text</h3>
          <h3 className="important-text">important-text</h3>
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control primary-input"
            placeholder="請輸入文字"
          />
          <br />
          <input
            type="number"
            className="form-control primary-input"
            placeholder="請輸入數字"
          />
          <br />
          <input
            type="date"
            className="primary-input form-control"
            name=""
            id=""
          />
          <br />
          <select className="btn primary-select ml-4 mt-2">
            <option>超商取貨</option>
            <option>黑貓宅配</option>
          </select>
          <br />
          <br />
          <label className=" form-check-label">
            <input type="checkbox" />
            收件人資訊同會員資訊
          </label>
          <img src="/components/OHYA.png" alt="" />
        </div>
      </div>
    </>
  )
}
export default Example
