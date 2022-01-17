function(elevent, e) {

  var strs = [ "AddTagId", "goPageTop", "goPageBottom", "SearchForm" ];

  for ( var t = 0; t < strs.length; t++) {

    var elm = document.getElementById(strs[t]);

    if (elm)

      elm.onclick = eXo.wiki.UIWikiPortlet.cancel;

  }

  if (!e)

    e = window.event;

  e.cancelBubble = true;

  var parend = eXo.core.DOMUtil.findAncestorByTagName(elevent, "div");

  var popup = eXo.core.DOMUtil.findFirstDescendantByClass(parend, "div", "UIPopupCategory");

  if (popup.style.display === "none") {

    popup.style.display = "block";

    eXo.core.DOMUtil.listHideElements(popup);

  } else {

    popup.style.display = "none";

  }

}