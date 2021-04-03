const isDev = () => {
  return { type: 'YES' }
}
const isNotDev = () => {
  return { type: 'NO' }
}

export { isDev, isNotDev }
