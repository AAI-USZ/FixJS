function() {
  var WikiLayout = eXo.wiki.WikiLayout;
  if(!WikiLayout.layoutContainer) WikiLayout.init('');
  var pageArea =  gj(WikiLayout.rightArea).find('div.UIWikiPageArea')[0];
  if(pageArea) {
    var bottomArea = gj(WikiLayout.rightArea).find('div.UIWikiBottomArea')[0];
    var pageContainer = gj(WikiLayout.rightArea).find('div.UIWikiPageContainer')[0];
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