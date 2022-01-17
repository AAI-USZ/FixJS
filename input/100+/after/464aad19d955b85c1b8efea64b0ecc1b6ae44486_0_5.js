function addFileToTemplate(html, file){
	
	var spanFile = document.getElementById("span_"+file.path+"_"+file.fileName);	
	if(null!=spanFile){ //this file already exists into the template
		alert("The file that you want to add already exists into this template.");
		return;
	}else{
		//create the span
		spanFile = document.createElement("span");
		spanFile.setAttribute("id", "span_"+file.path+"_"+file.fileName);
		spanFile.setAttribute("class", file.extension+"Span");
		
		spanIcon = document.createElement("span");
		spanIcon.setAttribute("class", file.extension+"Icon");
		spanIcon.innerHTML="<h3>"+file.fileName+"</h3>";
		
		//create the remove file link
		var removeFile = document.createElement("div");
		removeFile.setAttribute("class", "removeDiv");
		removeFile.innerHTML='<a href="javascript: removeFile(\''+file.path+'\', \''+file.fileName+'\');" title="Remove File"><span class="minusIcon"></span>Remove File</a></div>';
		spanFile.appendChild(spanIcon);
		spanFile.appendChild(removeFile);
		var divForSpanFiles = document.getElementById("fileContainerDiv");
		if(null==divForSpanFiles){
			divForSpanFiles = document.createElement("div");
			divForSpanFiles.setAttribute("id", "fileContainerDiv");
			document.getElementById("bodyTemplate").insertBefore(divForSpanFiles, document.getElementById("bodyTemplate").firstChild);
		}
		divForSpanFiles.appendChild(spanFile);
		var divHiddenForFiles = document.getElementById("jsCssToAdd");
		
		if(null==divHiddenForFiles){
			//we must create
			divHiddenForFiles = document.createElement("div");
			divHiddenForFiles.setAttribute("id", "jsCssToAdd");
			divHiddenForFiles.style.display="none";
		}
		
		// append the new file
		var divHiddenSingleFile = document.createElement("div");
		divHiddenSingleFile.setAttribute("id", "div_"+file.path+"_"+file.fileName);
		divHiddenSingleFile.style.display="none";
		divHiddenSingleFile.innerHTML='<!-- '+html+' -->';
		divHiddenForFiles.appendChild(divHiddenSingleFile);
		
		//add at the first position into the bodyTemplate div
		var bodyTemplate = document.getElementById("bodyTemplate");
		bodyTemplate.insertBefore(divHiddenForFiles, bodyTemplate.firstChild);
	}
}