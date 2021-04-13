DEMO LINK: https://seandp1a.github.io/myreact_gp

# 資策會專題 - JU4T 手機殼

## (網站內素材僅供練習並無商用且禁止商用)

此專案為使用 React.JS 製作的 手機殼電商網站

是我在 資策會-前端工程養成班 與另外五位組員共同製作

並由本人將他轉成 Git-Hub Page 以當做作品集來 DEMO

## 進度

### ✓ 首頁

### ✓ 商品

- ✓ 商品列表
- ✓ 篩選型號、主題
- ✓ 客製化商品列表(存在 localStorage)
- ✓ 加入購物車(Cookie)

### ✘ 會員

- ✓ 登入
- ✓ 註冊
- ✓ 會員資料
- ✓ 密碼變更
- ✓ 訂單紀錄

### ✓ 結帳

- ✓ 購物車(登入&未登入)
- ✓ 結帳(付款方式&取貨方式)
- ✓ 可在會員訂單紀錄觀看購買品項

### ✘ 遊戲

### ✘ 社群

## 工作分配

| 分類           | 原作者  |
| -------------- | :-----: |
| 首頁 home      |  Jenny  |
| 會員 members   | Jasmine |
| 產品 products  |  Jamie  |
| 訂單 orders    |  友菘   |
| 折價卷 coupons |  世能   |
| 社群 social    |   Zu    |

### 使用資源

- [react-bootstrap](https://react-bootstrap.github.io/)

- [react-icons](https://react-icons.github.io/react-icons/)

- [gh-pages](https://www.npmjs.com/package/gh-pages)

## Note：

使用 React Router 並設 basename={process.env.PUBLIC_URL}
故所有 Route 的 pathname 前端會有一串 "/myreact_gp"

- Public 圖片位址 (因為是首頁，img 的 src 可以使用 "./img/home/....")

- Unicode text JWT parser function :
  function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/\_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

      return JSON.parse(jsonPayload);

  };
