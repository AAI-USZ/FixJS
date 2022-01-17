function () {
	//getElementByID
	function ElId(x) {
		var anElement = document.getElementById(x);
		return anElement;
	}
	//variables
	var billCategories = ["Credit", "Rent", "Utilities", "Misc"],
		paidValue,
		displayData = ElId('displayData'),
		clear = ElId('clear'),
		saveData = ElId('submit');
	// create category group elements and give options
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
	// find radio button value
	function getRadio() {
		var radios = document.forms[0].billPaid,
			i;
		for (i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				paidValue = radios[i].value;
			}
		}
	}
	function toggle(b) {
		switch (b) {
		case "on":
			ElId('billForm').style.display = "none";
			ElId('clear').style.display = "inline";
			ElId('displayData').style.display = "none";
			ElId('addNew').style.display = "inline";
			break;
		case "off":
			ElId('billForm').style.display = "block";
			ElId('clear').style.display = "inline";
			ElId('displayData').style.display = "inline";
			ElId('addNew').style.display = "none";
			ElId('items').style.display = "none";
			break;
		default:
			return false;
		}
	}
	//function to store data in local storage
	function storeData() {
		var id = Math.floor(Math.random() * 1000100001),
			item = {};
		//store form fields in object
		//object will contain array with form label and input value
		getRadio();
		item.category = ["Bill Category:", ElId('categories').value];
		item.billName = ["Bill Name:", ElId('billName').value];
		item.accountNum = ["Account Number:", ElId('accountNum').value];
		item.billAmount = ["Amount Due:", ElId('billAmount').value];
		item.dueDate = ["Date Due:", ElId('dueDate').value];
		item.billPaid = ["Is Bill Paid?", paidValue];
		item.priority = ["Priority:", ElId('priority').value];
		item.comments = ["comments:", ElId('comments').value];
		//Save into local storage and convert to string(JSON.stringify)
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved");
	}
	function clearData() {
		if (localStorage.length === 0) {
			alert("No bills to clear!");
		} else {
			localStorage.clear();
			alert("All bills have been cleared.");
			window.location.reload();
			return false;
		}
	}
	function getData() {
		toggle("on");
		if (localStorage.length === 0) {
			alert("No bills to display!");
		}
		//see local storage data in browser
		var makeDiv = document.createElement('div'),
			makeList = document.createElement('ul'),
			i,
			j,
			key = localStorage.key(i),
			value = localStorage.getItem(key),
			object = JSON.parse(value),
			makeLi,
			makeSubList,
			a,
			makeSubLi,
			optSubText;
		makeDiv.setAttribute("id", "items");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		//ElId('items').style.display = "block";
		for (i = 0, j = localStorage.length; i < j; i++) {
			makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (a in object) {
				makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				optSubText = object[a][0] + " " + object[a][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	//click events and run makeCategory
	clear.addEventListener("click", clearData);
	displayData.addEventListener("click", getData);
	saveData.addEventListener("click", storeData);
	makeCategory();
}