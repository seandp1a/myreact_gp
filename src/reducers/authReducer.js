const authReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      sessionStorage.setItem('JWT_TOKEN', action.payload)
      let member = parseTokenToMember(action.payload)
      return member
    case 'UPDATE_AUTH':
      if (action.payload) {
        let newState = {
          sid: state.sid,
          account: state.account,
          name: action.payload.name,
          mobile: action.payload.mobile,
          birthday: action.payload.birthday,
          token: state.token,
        }
        return newState
      }
      return state
    case 'CLEAR_AUTH':
      sessionStorage.removeItem('JWT_TOKEN')
      return false
    default:
      return state
  }
}

/* Get token's payload */
function parseTokenToMember(token) {
  var base64Url = token.split('.')[1]
  var tokenChunks = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var member = JSON.parse(
    decodeURIComponent(
      atob(tokenChunks)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  )

  // let tokenChunks = token.replace('Bearer ', '').split('.')
  // let member = JSON.parse(decodeURIComponent(escape(atob(tokenChunks[1]))))
  member.token = token
  return member
}

export default authReducer
