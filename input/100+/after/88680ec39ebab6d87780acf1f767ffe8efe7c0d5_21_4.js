function(param, element, isFullRender) {
  var me = eXo.wiki.UITreeExplorer;
  var node = element.parentNode;
  var component = gj(node).closest(".UITreeExplorer");
  var url = gj(component).find('input.ChildrenURL')[0].value;
  if (isFullRender) {
    url = gj(component).find('input.InitURL')[0].value;
  }
  var restURL = url + param;

  var childBlock = document.createElement("div");
  if (me.innerDoc) {
    childBlock = me.innerDoc.createElement("div");
    me.innerDoc = null;
  }
  childBlock.className = "NodeGroup";
  childBlock.innerHTML = me.loading;
  node.appendChild(childBlock);

  gj.ajax({
    async : false,
    url : restURL,
    type : 'GET',
    data : '',
    success : function(data) {
      me.renderTreeNodes(childBlock, data);
    }
  });
}