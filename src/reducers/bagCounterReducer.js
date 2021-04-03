const bagCounterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'SETCOUNT':
      return action.payload
    case 'CLEARBAG':
      return state - state
    default:
      return state
  }
}

export default bagCounterReducer
