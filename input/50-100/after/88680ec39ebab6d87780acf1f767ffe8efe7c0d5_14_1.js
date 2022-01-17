function(id) {
  var uicomponent = document.getElementById(id);
  this.spliter = gj(uicomponent).find('div.Spliter')[0];
  
  eXo.wiki.UIWikiSettingContainer.setHeightLayOut();
}