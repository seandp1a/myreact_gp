const isDevReducer = (state = true, action) => {
  // npm run deploy
  switch (action.type) {
    case 'YES':
      return true
    case 'NO':
      return false
    default:
      return state
  }
}

export default isDevReducer
