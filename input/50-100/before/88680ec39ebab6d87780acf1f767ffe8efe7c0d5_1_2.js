function(evt) {
  var me = eXo.wiki.UIFieldEditableForm;
  evt = window.event || evt;
  var keyNum = eXo.core.Keyboard.getKeynum(evt);
  if (evt.altKey || evt.ctrlKey || evt.shiftKey)
    return;
  switch (keyNum) {
  case 13:
    me.enterHandler(evt);
    break;
  case 27:
    // me.escapeHandler();
    break;
  case 38:
    // me.arrowUpHandler();
    break;
  case 40:
    // me.arrowDownHandler();
    break;
  default:
    break;
  }
  return;
}