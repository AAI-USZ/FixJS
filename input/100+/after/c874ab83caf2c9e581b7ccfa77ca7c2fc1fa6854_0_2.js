function() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in Local Storage.");
		};
		
		// This is supposed to write data from Local Storage back to the browser.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		// This code should add the data to my page when I press show data.
		document.body.appendChild(makeDiv);
		gebi("items").style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert strings back to being an object from localStorage value.
			var object = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for (var n in object) {
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = object[n][0] + " " + object[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			};
			// Create the edit and delete buttons/link for each item in local storage.
			makeItemLinks(localStorage.key(i), linksLi);
		};
	}