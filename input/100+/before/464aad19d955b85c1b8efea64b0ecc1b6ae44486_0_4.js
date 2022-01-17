function addGrid(gridId, yuiBId, rowCount){
	var mainDiv = document.getElementById("yui-main-template");
	var yuiBDiv = document.getElementById(yuiBId);
	if(null==yuiBDiv){ // create
		yuiBDiv = document.createElement("div");
		yuiBDiv.setAttribute("class","yui-b-template");
		yuiBDiv.setAttribute("id",yuiBId);
		mainDiv.appendChild(yuiBDiv);
	}else{
		//delete its content
		while (yuiBDiv.hasChildNodes()) {
			yuiBDiv.removeChild(yuiBDiv.lastChild);
		}
	}
	if(1!=gridId){
		var gridDiv = document.createElement("div");
		var yuiUFirst = document.createElement("div");
		var yuiU2 = document.createElement("div");
		var yuiU3 = document.createElement("div");
			
		gridDiv.setAttribute("class",gridId);
		gridDiv.setAttribute("id",gridId);
		yuiUFirst.setAttribute("class","yui-u-template first");
		yuiUFirst.setAttribute("id",rowCount+"_yui-u-grid-1");
		yuiUFirst.innerHTML=getAddContainer(rowCount+"_yui-u-grid-1")+"<h1>Body</h1>";
		yuiUFirst.style.height="50%";
		yuiU2.setAttribute("class","yui-u-template");
		yuiU2.setAttribute("id",rowCount+"_yui-u-grid-2");
		yuiU2.innerHTML=getAddContainer(rowCount+"_yui-u-grid-2")+"<h1>Body</h1>";
		yuiU2.style.height="50%";
		gridDiv.appendChild(yuiUFirst);
		gridDiv.appendChild(yuiU2);
		if("yui-gb-template"==gridId){
			yuiU3.setAttribute("class","yui-u-template");
			yuiU3.setAttribute("id",rowCount+"_yui-u-grid-3");
			yuiU3.innerHTML=getAddContainer(rowCount+"_yui-u-grid-3")+"<h1>Body</h1>";
			yuiU3.style.height="50%";
			gridDiv.appendChild(yuiU3);
		}		
		yuiBDiv.appendChild(gridDiv);		
	}else{
		yuiBDiv.innerHTML=getAddContainer(yuiBId)+"<h1>Body</h1>";
	}
}