function getData() {
	toggleControls("on");
	if(localStorage.length===0){
		alert("There is no data in Local Storage.");
	}
	// Write Data from local storage
	var makeDiv = document.createElement("div");
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement("ul");
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeli =document.createElement("li");
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//convert to string from local storage value back to an object by using JSON.parse()
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeli.appendChild(makeSubList);
		for(var n in obj){
			var makeSublist = document.createElement("li");
			makeSublist.appendChild(makeSubli);
			var optSubText = obj [n] [0] + " "+obj[n][1];
			makeSubli.innerHTML = optSubText;

		}
	}
}