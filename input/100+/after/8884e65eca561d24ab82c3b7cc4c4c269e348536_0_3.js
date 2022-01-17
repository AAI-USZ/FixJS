function getData() {
	toggleControls("on");
	if(localStorage.length===0){
		alert("There is no new Moments.");
	}
	// Write Data from local storage
	var makeDiv = document.createElement("div");
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement("ul");
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$("items").style.display="block";
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi =document.createElement("li");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//convert to string from local storage value back to an object by using JSON.parse()
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		for(var n in obj){
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj [n] [0] + " "+obj[n][1];
			makeSubLi.innerHTML = optSubText;

		}
	}
}