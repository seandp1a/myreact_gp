import { combineReducers } from 'redux'
import bagCounterReducer from './bagCounterReducer'
import authReducer from './authReducer'
import isDevReducer from './isDevReducer'

const allReducers = combineReducers({
  bagCounter: bagCounterReducer,
  auth: authReducer,
  dev: isDevReducer,
})

export default allReducers
