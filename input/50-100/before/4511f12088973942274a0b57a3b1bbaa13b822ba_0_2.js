function (button, text) {
  button.show();
  button[0].style.borderStyle = 'outset';
  button[0].style.color = styles.bigButtonInactiveColor;
  if (text) {
    button.text(text);
  }
}