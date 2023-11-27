export const isDate = (dateValue) => {
  if(!dateValue) return false

  const date = new Date(dateValue)
  return !isNaN(date.getTime())
}