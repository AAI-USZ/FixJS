function(evt, textbox) {

  var uiform = eXo.core.DOMUtil.findAncestorByClass(textbox,
      "UIWikiAdvanceSearchForm");
  var list = eXo.core.DOMUtil.findDescendantsByClass(uiform, "div",
      "SearchAction");
  list[0].onclick();

}