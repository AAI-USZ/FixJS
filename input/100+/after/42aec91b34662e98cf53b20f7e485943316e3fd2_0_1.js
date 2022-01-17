function makeCats() {
		var formTag = document.getElementsByTagName("petForm"),
			selectLi = gebi("petsType"),
			makeSelect = document.createElement("petType");
			makeSelect.setAttribute("id", "petType");
		for (var i=0, j=petGroup.length; i<j; i++) {
			var makeOption = document.createElement("option");
			var optTxt = petGroup[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	}