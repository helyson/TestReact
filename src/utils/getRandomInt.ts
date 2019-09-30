export default (min: number, max: number) => {
  const minCeil: number = Math.ceil(min)
  const maxFloor: number = Math.floor(max)

  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil
}
