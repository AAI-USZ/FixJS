function(objNode) {  
	if(!objNode) return;
	var rws = document.getElementById("RightWorkspace");
	if(eXo.ecm.ECS.typeObj == "folder" || eXo.ecm.ECS.typeObj == "one") {
		var action = rws.getAttribute("action");
		action = action.substring(0, action.length - 2);
		action += '&objectId=' + encodeURIComponent(eXo.ecm.ECS.driverName) + ":" + encodeURIComponent(eXo.ecm.ECS.repositoryName) + ":" + encodeURIComponent(eXo.ecm.ECS.workspaceName) + ":" + encodeURIComponent(objNode.getAttribute("path")) + '\')';
		var temp = action;
		var index = temp.indexOf("%27");
		while(index != -1) {
		   temp = temp.replace("%27","%2527");
		   index = temp.indexOf("%27");
		}
		action = temp;		
		eval(action);
	} else {
		var hostName = eXo.ecm.ECS.hostName;
		var nodeType = objNode.getAttribute('nodeType');
		var url 	= objNode.getAttribute('url');
		var temp = url;
  var index = temp.indexOf("%27");
  while(index != -1) {
   temp = temp.replace("%27","%2527");
 		index = temp.indexOf("%27");
  }
  url = encodeURIComponent(eXo.ecm.ECS.hostName+temp);
  url = decodeURIComponent(url);    
 	var name 	= encodeURIComponent(objNode.title);
 	name = decodeURIComponent(name);
		var strHTML = '';	
		var editor = eXo.ecm.ECS.currentEditor ;    
    if(eXo.ecm.ECS.components=="") {
			if(window.opener.document.getElementById(eXp.getParameterValueByName("browserType"))){		
				strHTML += url;		
				window.opener.document.getElementById(eXp.getParameterValueByName("browserType")).value=strHTML;
			} else {
				if(nodeType.indexOf("image") >=0) {
					strHTML += "<img src=\""+url+"\" name=\""+name+"\" alt=\""+name+"\"/>";
				} else {
					strHTML += "<a href=\"" + url+"\">"+name+"</a>";		
				}		    		    
				editor.insertHtml(strHTML);
				window.close();
				editor.OnAfterSetHTML = window.close();				
			}
		} else {      						
			var newImg = new Image();
			newImg.src = url;
      newImg.onload = function() {
				var height = newImg.height;
				var width = newImg.width;  
        var parent = window.opener.document;
        parent.getElementById(eXo.ecm.ECS.components).src=url;
				parent.getElementById(eXo.ecm.ECS.components).style.display="block";
				parent.getElementById(editor.name+"_txtWidth").value=width;	
				parent.getElementById(editor.name+"_txtHeight").value=height;        
        var elements = parent.getElementsByTagName('*');
       	for(var i=0;i<elements.length;i++)	{        
					if(elements[i].type && elements[i].type=="text") {          
						if(elements[i].id && elements[i].id==editor.name+"_txtUrl") elements[i].value = url;
					}
				}       
				window.close();
				editor.OnAfterSetHTML = window.close();				
			}
		}		
	}
}