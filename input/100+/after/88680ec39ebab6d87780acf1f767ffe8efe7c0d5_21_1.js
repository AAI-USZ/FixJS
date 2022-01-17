function(componentid, initParam, isFullRender, isRenderLink, baseLink) {
  var me = eXo.wiki.UITreeExplorer;
  var component = document.getElementById(componentid);
  this.isRenderLink = isRenderLink;
  this.baseLink = baseLink;
  var initNode = gj(component).find('input')[0];
  initParam = me.cleanParam(initParam);
  me.render(initParam, initNode, isFullRender);
}