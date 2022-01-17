function makeCategory() {
		//formTag is array of form tags
		var	selectLi = ElId('select'),
			createSelect = document.createElement('select'),
			i,
			j,
			makeOption = document.createElement('option'),
			optText = billCategories[i];
		createSelect.setAttribute("id", "categories");
		for (i = 0, j = billCategories.length; i < j; i++) {
			makeOption.setAttribute("value", billCategories[i]);
			makeOption.innerHTML = optText;
			createSelect.appendChild(makeOption);
		}
		selectLi.appendChild(createSelect);
	}