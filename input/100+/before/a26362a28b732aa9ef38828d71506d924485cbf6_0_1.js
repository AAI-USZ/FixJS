function(list) {	
  var ECS = eXo.ecm.ECS;
  //Get view type to display content  
  var viewType = eXo.ecm.ECS.viewType; 
  //view = document.getElementById("viewTypeID").value;    
	var rightWS = document.getElementById('RightWorkspace');  
	if(!list || list.length <= 0) {
		if(viewType=="list") {
			var tblRWS  = eXo.core.DOMUtil.findDescendantsByTagName(rightWS, "table")[0];
			var rowsRWS = eXo.core.DOMUtil.findDescendantsByTagName(tblRWS, "tr");
			if(rowsRWS && rowsRWS.length > 0) {
				for(var i = 0; i < rowsRWS.length; i++) {
					if(i > 0) tblRWS.deleteRow(rowsRWS[i].rowIndex);
				}
			} 
			var tdNoContent = tblRWS.insertRow(1).insertCell(0);
			tdNoContent.innerHTML = "There is no content";
			tdNoContent.className = "Item TRNoContent";
			tdNoContent.setAttribute("colspan",3);
			tdNoContent.userLanguage = "UserLanguage.NoContent";	
			document.getElementById("pageNavPosition").innerHTML = "";
		} else {
			var container = eXo.core.DOMUtil.findFirstDescendantByClass(rightWS,'div','ActionIconsContainer');
			container.innerHTML = "<div class=\"NoContent\" userLanguage=\"UserLanguage.NoContent\">There is no content</div>";
			document.getElementById("pageNavPosition").innerHTML = "";
		}
		return;
	} else {		
    
    if(viewType=="list") {
			var tblRWS  = eXo.core.DOMUtil.findDescendantsByTagName(rightWS, "table")[0];
			if(tblRWS) {
				var rowsRWS = eXo.core.DOMUtil.findDescendantsByTagName(tblRWS, "tr");
				if(rowsRWS && rowsRWS.length > 0) {
					for(var i = 0; i < rowsRWS.length; i++) {
						if(i > 0) tblRWS.deleteRow(rowsRWS[i].rowIndex);
					}
				} 
			} else eXo.ecm.ECS.updateHTML(viewType);			
		} else {
			var container = eXo.core.DOMUtil.findFirstDescendantByClass(rightWS,'div','ActionIconsContainer');
			if(container) container.innerHTML = "";
      else eXo.ecm.ECS.updateHTML(viewType);
		}			
		var listItem = '';
		for(var i = 0; i < list.length; i++) {      
			var url 			= list[i].getAttribute("url");
			url = encodeURIComponent(url);
			var path 			= list[i].getAttribute("path");
			var nodeType	= list[i].getAttribute("nodeType");
      var nodeTypeIcon = nodeType.replace(":", "_") + "48x48Icon default16x16Icon";
			var node = list[i].getAttribute("name");
			node = encodeURIComponent(node);
			var size = 	list[i].getAttribute("size");
			if(size == 0) size = "";
			else size += '&nbsp;kb';
      
      if(viewType=="list") {	        
				var clazz = 'OddItem';
        var tblRWS  = eXo.core.DOMUtil.findDescendantsByTagName(rightWS, "table")[0];
				var clazzItem = eXo.ecm.ECS.getClazzIcon(list[i].getAttribute("nodeType"));
				var newRow = tblRWS.insertRow(i+1);
				newRow.className = clazz;					
				newRow.insertCell(0).innerHTML = '<a class="Item default16x16Icon '+clazzItem+'" url="'+decodeURIComponent(url)+'" path="'+path+'" nodeType="'+nodeType+'" style = "overflow:hidden;" title="'+decodeURIComponent(node)+'" onclick="eXo.ecm.ECS.insertContent(this);">'+decodeURIComponent(node).trunc(15,false)+'</a>';
				newRow.insertCell(1).innerHTML = '<div class="Item">'+ list[i].getAttribute("dateCreated") +'</div>';
				newRow.insertCell(2).innerHTML = '<div class="Item">'+ size +'</div>';
			} else {				  
        var container = eXo.core.DOMUtil.findFirstDescendantByClass(rightWS,'div','ActionIconsContainer');			
				var strViewContent = "";
				var command = ECS.connector + "/thumbnailImage/medium/" + ECS.repositoryName + "/" + ECS.workspaceName + path + "/?reloadnum=" + Math.random();        
				strViewContent += '<div class="ActionIconBox" onclick="eXo.ecm.ECS.insertContent(this);" url="'+decodeURIComponent(url)+'" path="'+path+'" nodeType="'+nodeType+'" title="'+decodeURIComponent(node)+'"><div class="NodeLabel"><div class="ThumbnailImage"><div style="display: block;" class="LoadingProgressIcon"><img alt="Loading Process" src="'+command+'" onerror="var img = eXo.core.DOMUtil.findNextElementByTagName(this.parentNode,\'div\'); img.style.display = \'block\'; this.parentNode.style.display = \'none\';" onload="this.parentNode.style.backgroundImage=\'none\'" /></div><div style="display: none;" class="Icon48x48 default48x48Icon '+nodeTypeIcon+'"></div></div><div class="ActionIconLabel" style="width: auto;"><a class="ActionLabel" onclick="eXo.ecm.ECS.insertContent(this);" url="'+url+'" path="'+path+'" nodeType="'+nodeType+'" title="'+decodeURIComponent(node)+'">'+decodeURIComponent(node)+'</a></div></div>';	        
				container.innerHTML += strViewContent;
			}
		}			
	}	
	if(i > 12) {
		var numberRecords = 12;		
		var viewType = eXo.ecm.ECS.viewType; 
    if(viewType=='list') eXo.ecm.Pager = new Pager("ListRecords", numberRecords);
    else eXo.ecm.Pager = new Pager("ActionIconsContainer", numberRecords);
		eXo.ecm.Pager.init(); 
		eXo.ecm.Pager.showPageNav('pageNavPosition');
		eXo.ecm.Pager.showPage(1);	
	} else {
		document.getElementById("pageNavPosition").innerHTML = "";
	}	
}