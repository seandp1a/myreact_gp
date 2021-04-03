import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux'

import App from './App'
import './styles/custom.scss'

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// fetch("http://localhost:3310/products/decode-token", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ token }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     setCartList(data.data)

//   });
//   console.log(cartList)
