function(portletId, linkId) {

  var me = eXo.wiki.UIWikiPortlet;

  me.wikiportlet = document.getElementById(portletId);

  me.changeWindowTite(me.wikiportlet);

  me.changeModeLink = document.getElementById(linkId);



  // window.onload = function(event) {me.changeMode(event);};

  /*window.onbeforeunload = function(event) {

    me.changeMode(event);

  };*/



  gj(me.wikiportlet).mouseup(me.onMouseUp);

  /*gj(me.wikiportlet).keyup(me.onKeyUp);*/

}