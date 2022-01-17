function(id) {
  var uicomponent = document.getElementById(id);
  var DOMUtil = eXo.core.DOMUtil;
  this.spliter = DOMUtil.findFirstDescendantByClass(uicomponent, "div", "Spliter");
  
  eXo.wiki.UIWikiSettingContainer.setHeightLayOut();
}