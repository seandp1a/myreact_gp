const setAuth = (token) => {
  return { type: 'SET_AUTH', payload: token }
}

const updateAuth = (member) => {
  return { type: 'UPDATE_AUTH', payload: member }
}

const clearAuth = () => {
  return { type: 'CLEAR_AUTH' }
}

export { setAuth, updateAuth, clearAuth }
