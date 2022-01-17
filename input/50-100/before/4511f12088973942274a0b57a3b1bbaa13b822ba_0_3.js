function (button, text) {
  button.show();
  button[0].style.borderStyle = 'inset';
  button[0].style.color = styles.bigButtonActiveColor;
  if (text) {
    button.text(text);
  }
}