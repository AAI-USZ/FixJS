function(data) {
  var me = eXo.wiki.UITreeExplorer;   
  var nodeName = data.name; 
  // Change Type for CSS
  var nodeType = data.nodeType;
  var nodeTypeCSS = nodeType.substring(0, 1).toUpperCase()
      + nodeType.substring(1).toLowerCase();
  var iconType = (data.expanded ==true)? "Collapse":"Expand" ;
  var lastNodeClass = "";
  var hoverClass = "";
  var excerptData = data.excerpt;
  var path = data.path.replaceAll("/", ".");
  var param = "?path=" + path;
  if (excerptData!=null) {
    param += "&excerpt=true";
  }
  if (data.extendParam)
    param += "&current=" + data.extendParam.replaceAll("/",".");
  if (data.lastNode == true) {
    lastNodeClass = "LastNode";
  }
  if (data.hasChild == false) {
    iconType = "Empty";
  }
  if (data.selected == true){
    hoverClass = "Hover";
  }
  var childNode = "";
  childNode += " <div  class=\"" + lastNodeClass + " Node\" >";
  childNode += "   <div class=\""+iconType+"Icon\" id=\"" + path + "\" onclick=\"event.cancelBubble=true;  if(eXo.wiki.UITreeExplorer.collapseExpand(this)) return;  eXo.wiki.UITreeExplorer.render('"+ param + "', this)\">";
  if (me.isRenderLink) {
    childNode += "    <div id=\"iconTreeExplorer\" onclick=\"event.cancelBubble=true\" class=\""+ nodeTypeCSS +" TreeNodeType Node "+ hoverClass +" \">";
  } else {
    childNode += "    <div id=\"iconTreeExplorer\"  onclick=\"event.cancelBubble=true; eXo.wiki.UITreeExplorer.onNodeClick(this,'"+path+"', false " + ")\""  + "class=\""+ nodeTypeCSS +" TreeNodeType Node "+ hoverClass +" \">";
  }  
  childNode += "      <div class='NodeLabel'>";
  
  if (data.selectable == true) {
    if (me.isRenderLink) {
      var index = path.lastIndexOf("%2F"); // Find the index of character "/"
      var pageId = path.substring(index + 3);
      var link = me.baseLink + pageId;
      childNode += "        <a title=\"" + nodeName + "\" href=\"" + link + "\">" + nodeName + "</a>";
    } else {
      childNode += "        <a title=\"" + nodeName + "\">" + nodeName + "</a>";
    }
  }
  else{
    childNode += "         <span style=\"cursor:auto\" title=\""+nodeName+"\">"+nodeName+"</span>";
  }
  if (excerptData != null) {
    childNode += excerptData;
  }
  childNode += "      </div>";
  childNode += "    </div>";
  childNode += "  </div>";
  if (data.children.length > 0) {
    childNode += me.buildHierachyNode(data);
  }
  childNode += " </div>"; 
  return childNode;
}