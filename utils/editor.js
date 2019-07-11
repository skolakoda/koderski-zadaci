const CodeMirror = window.CodeMirror
const kzEditor = document.querySelector('#kzeditor')

export const editor = CodeMirror.fromTextArea(
  kzEditor, {
    mode: 'javascript',
    theme: 'nord',
    lineNumbers: true
  })
