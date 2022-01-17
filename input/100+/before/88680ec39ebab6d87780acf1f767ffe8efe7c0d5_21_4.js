function(param, element, isFullRender) {
  var me = eXo.wiki.UITreeExplorer;
  var node = element.parentNode;
  var component = eXo.core.DOMUtil.findAncestorByClass(node, "UITreeExplorer");
  var url =  eXo.core.DOMUtil.findFirstDescendantByClass(component, "input", "ChildrenURL").value;
  if (isFullRender){
    url =  eXo.core.DOMUtil.findFirstDescendantByClass(component, "input", "InitURL").value;
  }
  var http = eXo.wiki.UITreeExplorer.getHTTPObject();  
  var restURL = url + param;

  http.open("GET", restURL, true); 
  
  var childBlock = document.createElement("div");
  if (me.innerDoc) {
    childBlock = me.innerDoc.createElement("div");
    me.innerDoc = null;
  }
  childBlock.className = "NodeGroup";
  childBlock.innerHTML = me.loading;
  node.appendChild(childBlock);
  
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      me.renderTreeNodes(childBlock, http.responseText);      
    }
  }
  
  http.send("");
  element.className = "CollapseIcon";
}