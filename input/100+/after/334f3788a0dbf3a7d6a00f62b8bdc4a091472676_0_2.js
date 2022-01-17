function(relatedList, redirectUrl) {
  var docFrag = document.createDocumentFragment();
  for ( var i = 0; i < relatedList.length; i++) {
    var relatedItem = relatedList[i];
    var nodeGroupDiv = document.createElement("div");
    var nodeDiv = document.createElement("div");
    nodeGroupDiv.className = "Page TreeNodeType Node";

    var labelDiv = document.createElement("div");
    labelDiv.className = "NodeLabel";
    var a = document.createElement("a");
    if (redirectUrl && relatedItem.identity != null) {
      var relatedLink = redirectUrl + "&objectId="
          + encodeURIComponent(relatedItem.identity);
      a.href = relatedLink;
    }
    if (relatedItem.title) {
      a.setAttribute("title", relatedItem.title);
      a.appendChild(document.createTextNode(relatedItem.title));
    }
    labelDiv.appendChild(a);
    nodeDiv.appendChild(labelDiv);
    nodeGroupDiv.appendChild(nodeDiv);
    docFrag.appendChild(nodeGroupDiv);
  }
  return docFrag;
}