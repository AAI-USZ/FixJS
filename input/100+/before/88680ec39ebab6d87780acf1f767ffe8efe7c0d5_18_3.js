function() {
  var WikiLayout = eXo.wiki.WikiLayout;
  var DOMUtil = eXo.core.DOMUtil;
  if(!WikiLayout.layoutContainer) WikiLayout.init('');
  var pageArea = DOMUtil.findFirstDescendantByClass(WikiLayout.rightArea, "div", "UIWikiPageArea");
  if(pageArea) {
    var bottomArea = DOMUtil.findFirstDescendantByClass(WikiLayout.rightArea, "div", "UIWikiBottomArea");
    var pageContainer = DOMUtil.findFirstDescendantByClass(WikiLayout.rightArea, "div", "UIWikiPageContainer");
    if(bottomArea) {
      var pageAreaHeight = (WikiLayout.rightArea.offsetHeight - bottomArea.offsetHeight - WikiLayout.bottomPadding);
      if ((pageAreaHeight > pageArea.offsetHeight) && (pageAreaHeight > WikiLayout.min_height)) {
        pageArea.style.height = pageAreaHeight + "px";
      } else if (pageArea.offsetHeight < WikiLayout.min_height) {
        pageArea.style.height = WikiLayout.min_height + "px";
      }
    }
  }
}