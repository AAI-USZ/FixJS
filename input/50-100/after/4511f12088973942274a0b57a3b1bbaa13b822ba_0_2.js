function (button, text) {
  button.show();
  button.css({
    borderStyle: 'outset',
    color: styles.bigButtonInactiveColor
  });
  if (text) {
    button.text(text);
  }
}