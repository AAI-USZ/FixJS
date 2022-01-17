function(evt, textbox) {

  var me = eXo.wiki.UIWikiSearchBox;

  evt = window.event || evt;

  var keyNum = eXo.wiki.UIWikiPortlet.getKeynum(evt);

  if (evt.altKey || evt.ctrlKey || evt.shiftKey)

    return;

  switch (keyNum) {

  case 13:

    if (textbox.value.trim() != "")

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

    if (me.typeTimeout)

      clearTimeout(me.typeTimeout);

    if (me.currentItem)

      me.currentItem = null;

    me.typeTimeout = setTimeout(function() {

      if (me.xhr) {

        me.xhr.abort();

        me.xhr = null;

        delete me.xhr;

      }

      me.typeHandler(textbox);

      clearTimeout(me.typeTimeout);

    }, 500)

  }

  return;

}