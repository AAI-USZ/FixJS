function() {
		var popupContainer = document.getElementById("PopupContainer");
		var nodeName = '';
		var nodes = eXo.core.DOMUtil.findDescendantsByTagName(popupContainer, "input");
		for(var i = 0; i < nodes.length;  i++) {
			if(nodes[i].getAttribute("name") == "fileName") {
				nodeName = nodes[i].value;
			}
		}
		var iFrameUpload = eXo.core.DOMUtil.findFirstDescendantByClass(popupContainer, "iframe", "iFrameUpload");
		var formUpload = iFrameUpload.contentWindow.document.getElementsByTagName("form")[0];
		var filename = formUpload.file.value;
    try {
    	var m = filename.match(/(.*)[\/\\]([^\/\\]+\.\w+)$/);        
    	if(m[1]&&m[2]) filename = m[2];  
		} catch(e) {}         
		if ((!nodeName && eXo.ecm.UploadForm.isInvalidName(filename)) || eXo.ecm.UploadForm.isInvalidName(nodeName)) {
			alert('Invalid file name!');
			return;
		}
		
		var repositoryName = eXo.ecm.ECS.repositoryName;
		var workspaceName  = eXo.ecm.ECS.workspaceName;
		var driverName = eXo.ecm.ECS.driverName;
		var strParam = '';
		if (repositoryName !== undefined) strParam += "repositoryName="+ repositoryName;
		if (workspaceName !== undefined)  strParam += "&workspaceName=" + workspaceName;
		if(driverName) strParam += "&driverName=" + driverName;
		strParam += "&currentFolder="+eXo.ecm.ECS.currentFolder;
		strParam += "&currentPortal="+eXo.ecm.ECS.portalName;
		strParam += "&userId="+eXo.ecm.ECS.userId;
		var uploadId = eXo.ecm.UploadForm.uploadId;
		strParam +="&action=save&uploadId="+uploadId+"&fileName="+nodeName;
		var strConnector = eXo.ecm.ECS.connector.replace("/getDrivers?repositoryName=repository", "/");
//		var strConnector = eXo.ecm.ECS.connector.replace("/getDrivers?repositoryName=repository", "/");
		var connector = strConnector + eXo.ecm.ECS.cmdEcmDriver + eXo.ecm.ECS.controlUpload + "?"+ strParam + "&language="+eXo.ecm.ECS.userLanguage;
//		eXp.sendRequest(connector);
		var mXML = eXo.ecm.WCMUtils.request(connector);
    try {      
			var message = mXML.getElementsByTagName("Message")[0];
			if(message) {
				var intNumber = message.getAttribute("number");
				var strText  	= message.getAttribute("text");
				if(parseInt(intNumber) - 200) {
					alert(strText);
					eXo.ecm.UploadForm.updateFiles(eXo.ecm.ECS.currentNode);
				} else {
					alert(strText);
					eXo.ecm.ECS.currentNode =	eXo.ecm.ECS.temporaryNode;
					eXo.ecm.UploadForm.updateFiles(eXo.ecm.ECS.currentNode);
				}
				eXo.ecm.UploadForm.removeMask();
			} else {        
		 		eXo.ecm.UploadForm.removeMask();
			 	eXo.ecm.UploadForm.updateFiles(eXo.ecm.ECS.currentNode.id);
			}
		} catch(e) {      
			eXo.ecm.UploadForm.removeMask();
			eXo.ecm.UploadForm.updateFiles(eXo.ecm.ECS.currentNode.id);
		}
}