function(evt, textbox) {

  var me = eXo.wiki.UIWikiTemplateForm;

  evt = window.event || evt;

  var keyNum = eXo.wiki.UIWikiPortlet.getKeynum(evt);

  if (evt.altKey || evt.ctrlKey || evt.shiftKey)

    return;

  switch (keyNum) {

  case 13:

    me.enterHandler(evt);

    break;

  case 27:

    me.escapeHandler();

    break;

  case 38:

    me.arrowUpHandler();

    break;

  case 40:

    me.arrowDownHandler();

    break;

  default:

    break;

  }

  return;

}