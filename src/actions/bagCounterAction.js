const increment = () => {
  return { type: 'INCREMENT' }
}

const decrement = () => {
  return { type: 'DECREMENT' }
}

const setCount = (num) => {
  return { type: 'SETCOUNT', payload: num }
}
const CLEARBAG = () => {
  return { type: 'CLEARBAG' }
}

export { increment, decrement, setCount, CLEARBAG }
