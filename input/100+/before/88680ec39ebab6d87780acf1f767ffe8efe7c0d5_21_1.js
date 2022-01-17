function( componentid, initParam, isFullRender, isRenderLink, baseLink ) {
  var me = eXo.wiki.UITreeExplorer;
  var component = document.getElementById(componentid);
  if (component == null) {
    var editForm = document.getElementById('UIWikiPageEditForm');
    var ifm = eXo.core.DOMUtil.findFirstDescendantByClass(editForm, 'iframe', 'gwt-RichTextArea');
    // Store current iframe element
    me.innerDoc = ifm.contentDocument || ifm.contentWindow.document;

    component = me.innerDoc.getElementById(componentid);
  }
  
  this.isRenderLink = isRenderLink;
  this.baseLink = baseLink;
  var initURL = eXo.core.DOMUtil.findFirstDescendantByClass(component, "input", "InitURL");
  var initNode = eXo.core.DOMUtil.findFirstDescendantByClass(component, "div", "NodeGroup");
  initParam = me.cleanParam(initParam);
  me.render(initParam, initNode, isFullRender);
}