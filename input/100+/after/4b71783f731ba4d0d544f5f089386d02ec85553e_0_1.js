function() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = gebi("petsType"),
			makeSelect = document.createElement("petsType");
			makeSelect.setAttribute("id", "petsType");
		for(var i=0, j=petGroups.length; i<j; i++) {
			var makeOption = document.createElement("option");
			var optTxt = petGroups[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}