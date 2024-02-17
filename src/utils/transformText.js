
export default function (textInput) {
  textInput = textInput.replace(/[.,:!?-]/g, '');
  textInput = textInput.replace(/\n/g, ' ');
  return textInput;
}
