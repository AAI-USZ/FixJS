function() {
  var WikiLayout = eXo.wiki.WikiLayout;
  var maxWith = WikiLayout.layoutContainer.offsetWidth;
  var lWith = 0;
  if (WikiLayout.leftArea && WikiLayout.spliter) {
    lWith = WikiLayout.leftArea.offsetWidth + WikiLayout.spliter.offsetWidth;
  }
  if (WikiLayout.rightArea) {
    WikiLayout.rightArea.style.width = (maxWith - lWith) + 'px';
  }
}