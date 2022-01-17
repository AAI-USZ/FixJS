function(evt) {

  var me = eXo.wiki.UIWikiPortlet;

  var evt = evt || window.event;

  var target = evt.target || evt.srcElement;

  if (evt.button == 2)

    return;

  var searchPopup = eXo.core.DOMUtil.findFirstDescendantByClass(me.wikiportlet, "div", "SearchPopup");

  if (searchPopup)

    searchPopup.style.display = 'none';

  var breadCrumbPopup = eXo.wiki.UIWikiPortlet.getBreadcrumbPopup();

  if (breadCrumbPopup) {

    breadCrumbPopup.style.display = 'none';

  }

  if (target.tagName == "A" || (target.tagName == "INPUT" && target.type == "button") || target.tagName == "SELECT"

      || target.tagName == "DIV" && target.className.indexOf("RefreshModeTarget") > 0) {

    eXo.wiki.UIWikiPortlet.changeMode(evt);

  }

}