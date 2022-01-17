function (button, text) {
  button.show();
  button.css({
    borderStyle: 'inset',
    color: styles.bigButtonActiveColor
  });
  if (text) {
    button.text(text);
  }
}