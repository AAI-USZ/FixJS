function(objNode) {  
	var tblListFilesContent = document.getElementById("ListFilesContent");
	var rowsContent = eXo.core.DOMUtil.findDescendantsByTagName(tblListFilesContent, "tr");
	var trNoContent = eXo.core.DOMUtil.findFirstDescendantByClass(tblListFilesContent, "td", "TRNoContent");
	if(trNoContent) tblListFilesContent.deleteRow(trNoContent.parentNode.rowIndex);
	var url = objNode.getAttribute("url");  
	var nodeType	= objNode.getAttribute("nodeType");
	var path = objNode.getAttribute("path");
	var title = objNode.getAttribute("title");	
	var linkTarget = objNode.getAttribute("linkTarget");
	var selectedNodeList = eXo.core.DOMUtil.findDescendantsByClass(tblListFilesContent, "a", "Item");
	for(var i = 0; i < selectedNodeList.length; i++) {
		var selectedNodePath = selectedNodeList[i].getAttribute("linkTarget");
		if(linkTarget == selectedNodePath) {
			alert("This content is already in the list content.");
			return;
		}
	}
	var	clazzItem = objNode.className;
	var newRow = tblListFilesContent.insertRow(tblListFilesContent.children[0].children.length);
	newRow.className = "Item";
	newRow.insertCell(0).innerHTML = '<a class="Item" url="'+url+'" linkTarget ="' + linkTarget +'" path="'+path+'" nodeType="'+nodeType+' style = "overflow:hidden" title="'+decodeURIComponent(title)+'">'+eXo.ecm.ECS.safe_tags_regex(title)+'</a>';
	newRow.insertCell(1).innerHTML = '<div class="DeleteIcon" onclick="eXo.ecm.ECS.removeContent(this);"><span></span></div>';
	this.insertMultiContent("SaveTemporary", path);	
}