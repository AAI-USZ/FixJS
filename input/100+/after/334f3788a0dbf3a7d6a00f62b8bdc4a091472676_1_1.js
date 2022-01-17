function() {
  var me = eXo.wiki.UITreeExplorer;
  var pageTreeBlocks = gj(".PageTreeMacro");
  var editForm = document.getElementById('UIWikiPageEditForm');
  if (editForm != null) {
    var ifm = gj(editForm).find('iframe.gwt-RichTextArea')[0];
    if (ifm != null) {
      me.innerDoc = ifm.contentDocument || ifm.contentWindow.document;
      pageTreeBlocks = gj.merge(pageTreeBlocks, gj(me.innerDoc).find(".PageTreeMacro"));
    }
  }
  for ( var i = 0; i < pageTreeBlocks.length; i++) {
    var pageTreeBlock = pageTreeBlocks[i];
    var initNode = gj(pageTreeBlock).find('input')[0];
    this.baseLink = gj(pageTreeBlock).find('input.BaseURL')[0].value;
    var initParam = gj(pageTreeBlock).find('input.InitParams')[0].value;
    initParam = me.cleanParam(initParam);
    this.isRenderLink = true;
    if (gj(pageTreeBlock).find("div.NodeGroup").length > 0)
      return;
    me.render(initParam, initNode, false);
  }
}