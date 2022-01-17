function(strArray, strTargetArray) {
	if(!strArray) return;
	if (!strTargetArray) return;
	var tblListFilesContent = document.getElementById("ListFilesContent");
	var arrContent = strArray.split(";");
	var arrTarget = strTargetArray.split(";");
	if (arrContent.length>arrTarget.length) return;
	if(arrContent.length > 0) {
		var trNoContent = eXo.core.DOMUtil.findFirstDescendantByClass(tblListFilesContent, "td", "TRNoContent");
		if(trNoContent) tblListFilesContent.deleteRow(trNoContent.parentNode.rowIndex);
		var clazz = 'OddItem';
		for(var i = 0; i < arrContent.length-1; i++) {
			var path = arrContent[i];
			var target = arrTarget[i];
			var newRow = tblListFilesContent.insertRow(tblListFilesContent.children[0].children.length);
			if(clazz == 'EventItem') {
				clazz = 'OddItem';
			} else if(clazz == 'OddItem') {
				clazz = 'EventItem';
			}
			newRow.className = clazz;
			var strTmpArr = arrContent[i].split('/');
			var nodeName = strTmpArr[strTmpArr.length-1];
			newRow.insertCell(0).innerHTML = '<a class="Item" linkTarget ="'+ target+ '" path="'+path+'">'+decodeURIComponent(nodeName)+'</a>';
			newRow.insertCell(1).innerHTML = '<div  class="DeleteIcon" onclick="eXo.ecm.ECS.removeContent(this);"><span></span></div>';
		}
	}
}