function() {
  var WikiLayout = eXo.wiki.WikiLayout;
  var layout = eXo.wiki.WikiLayout.layoutContainer;
  var hdef = document.documentElement.clientHeight - layout.offsetTop;
  var hct = hdef * 1;
  gj(layout).css('height', hdef + 'px');
  var delta = WikiLayout.heightDelta();
  if(delta > hdef) {
    WikiLayout.setClassBody(WikiLayout.bodyClass);
  }
  while ((delta = WikiLayout.heightDelta()) > 0 && hdef > delta) {
    hct = hdef - delta;
    gj(layout).css('height', hct + "px");
    hdef = hdef - 2;
  }
  
  if (WikiLayout.leftArea && WikiLayout.spliter) {
    WikiLayout.leftArea.style.height = hct + "px";
    WikiLayout.spliter.style.height = hct + "px";
  } else if (WikiLayout.verticalLine) {
    WikiLayout.verticalLine.style.height = hct + "px";
  }
  
  if (WikiLayout.rightArea) {
    WikiLayout.rightArea.style.height = hct + "px";
  }
  
  WikiLayout.setHeightRightContent();
}