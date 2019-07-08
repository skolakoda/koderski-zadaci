function blankSpace (text) {
  const regBlankSpaces = /\s/g
  return regBlankSpaces.test(text)
}
function minLength (text) {
  const minLength = 8
  return !(text.length < minLength)
}
function validEmail (email) {
  const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regEmail.test(email)
}
function matchValue (text1, text2) {
  return text1 === text2
}
function validationMessage (msg, field, message) {
  msg.innerHTML = ''
  msg.innerHTML = message
  field.select()
  field.focus()
}

export { blankSpace, minLength, validEmail, matchValue, validationMessage }
