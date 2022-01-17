function(portletId, linkId) {

  var me = eXo.wiki.UIWikiPortlet;

  me.wikiportlet = document.getElementById(portletId);

  me.changeWindowTite(me.wikiportlet);

  me.changeModeLink = document.getElementById(linkId);



  // window.onload = function(event) {me.changeMode(event);};

  /*window.onbeforeunload = function(event) {

    me.changeMode(event);

  };*/



  /*if (document.attachEvent)

    me.wikiportlet.attachEvent("onmouseup", me.onMouseUp);

  else

    me.wikiportlet.onmouseup = function(event) {

      me.onMouseUp(event);

    };

  me.wikiportlet.onkeyup = function(event) {

    me.onKeyUp(event);

  };*/

}