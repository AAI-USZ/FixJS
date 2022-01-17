function getData() {
	 	//Write data from localStorage to the Browser
	 	var makeDiv = document.createElement("div");
	 	makeDiv.setAttribute("id", "items");
	 	var makeList = document.createElement("ul");
	 	makeDiv.appendChild(makeList);
	 	document.body.appendChild(makeDiv);
	 	for(var i = 0, j = localStorage.length; i<j; i++){
		 	var makeLi = document.createElement("li");
		 	makeList.appendChild(makeLi);
		 	var Key = localStorage.key(i);
		 	var value = localStorage.getItem(key);
		 	// Here we are converting our localStorage string value back into an object using JSON.parse().
		 	var jsonObject = JSON.parse(value);
		 	var makeSubList = document.createElement("ul");
		 	makeLi.appendChild(makeSubList);
		 	for(var i in jsonObject){
			 	var makeSubLi = document.createElement("li");
			 	makeSubList.appendChild(makeSubLi);
			 	var dataInfo = jsonObject[i][0]+" "+jsonObject[i][1];
			 	makeSubLi.innerHTML = dataInfo;
		 	}
		 	
		 	
	 	}
	 	
	 	
 	}