function () {
	//getElementByID
	function ElId(x) {
		var anElement = document.getElementById(x);
		return anElement;
	}
	//variables
	var billCategories = ["-- Pick A Category --", "Credit", "Rent", "Utilities", "Misc"],
		paidValue,
		displayData = ElId('displayData'),
		clear = ElId('clear'),
		saveData = ElId('submit'),
		errMessage = ElId('errors');

	// create category group elements and give options
	function makeCategory() {
		var selectLi = ElId('select'),
			createSelect = document.createElement('select');	
		createSelect.setAttribute("id", "categories");
		for (var i = 0, j = billCategories.length; i < j; i++) {
			var makeOption = document.createElement('option'),
				optText = billCategories[i];
			makeOption.setAttribute("value", optText);
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
	function storeData(key) {
		var id,
			item = {};
		if(!key){
			id = Math.floor(Math.random() * 1000100001);
		} else {
			id = key
		}
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
			optSubText,
			linksLi = document.createElement('li');
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
				makeSubList.appendChild(linksLi);
			}
		//make edit and delete links for local storage
		makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	//makes edit and delete links for each local storage entry
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a'),
			editText = "Edit Bill",
			deleteLink = document.createElement('a'),
			deleteText = "Delete Bill";
		//add edit bill link
		editLink.href = "#";
		editLink.key = key;
		editLink.addEventListener("click", editBill);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		//add delete bill link
		deleteLink.href = "#";
		deleteLink.key = key;
		deleteLink.addEventListener("click", deleteBill);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	//make edit local storage link work
	function editBill(){
		var value = localStorage.getItem(this.key),
			item = JSON.parse(value),
			i,
			radios = document.forms[0].billPaid,
			editSubmit = ElId('submit');
		toggle("off");
		ElId('categories').value = item.category[1];
		ElId('billName').value = item.billName[1];
		ElId('accountNum').value = item.accountNum[1];
		ElId('billAmount').value = item.billAmount[1];
		ElId('dueDate').value = item.dueDate[1];
		for (i = 0; i < radios.length; i++){
			if(radios[i].value === "Paid" && item.billPaid[1] === "Paid"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value === "Not Paid" && item.billPaid[1] === "Not Paid"){
				radios[i].setAttribute("checked", "checked");
			}
		ElId('priority').value = item.priority[1];
		ElId('comments').value = item.comments[1];
		// remove listener from save bill button
		saveData.removeEventListener("click", storeData);
		//change Submit Bill value to Submit Changes
		ElId('submit').value = "Submit Changes";
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		}
	}
	//check form before submitting
	function validate(e){
		var getCategory = ElId('categories'),
			getName = ElId('billName'),
			getAmount = ElId('billAmount'),
			getDate = ElId('dueDate'),
			//getPaid = ElId('billPaid'),
			getPaid = ElId('paid'),
			getNotPaid = ElId('notPaid'),
			//error messages
			messageArray = [],
			catError,
			nameError,
			amountError,
			dateError,
			paidError,
			i,
			j,
			txt;
			//reset error messages
		errMessage.innerHTML = "";
		getCategory.style.border = "1px solid grey";
		getName.style.border = "1px solid grey";
		getAmount.style.border = "1px solid grey";
		//getDate.style.border = "1px solid grey";
		getPaid.style.border = "1px solid grey";
		getNotPaid.style.border = "1px solid grey";
		//category validation
		if(getCategory.value === "-- Pick A Category --"){
			catError = "Please pick a category";
			getCategory.style.border = "1px solid red";
			messageArray.push(catError);
		}
		//bill Name validation
		if (getName.value === ""){
			nameError = "Please enter a bill name";
			getName.style.border = "1px solid red";
			messageArray.push(nameError);
		}
		//bill amount validation
		var dollarRe = /^\d+\.\d{2}$/;
		if (!(dollarRe.exec(getAmount.value))){
			amountError = "Please enter a amount due in XXX.XX format";
			getAmount.style.border = "1px solid red";
			messageArray.push(amountError);
		}
		// date validation
		/*
		if (getDate.value === ""){
			dateError = "Please enter the due date";
			getDate.style.border = "1px solid red";
			messageArray.push(dateError);
		}
		*/
		//bill paid validation
		if (!(paid.checked) && !(notPaid.checked)){
			paidError = "Please choose a paid option";
			getPaid.style.border = "1px solid red";
			getNotPaid.style.border = "1px solid red";
			messageArray.push(paidError);
		}
		//display errors if there is any
		if(messageArray.length >= 1){
			for(i = 0, j = messageArray.length; i < j; i++){
				txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				errMessage.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			//if no errors, run storeData
			storeData(this.key);
		}
			
	}
	//click events and run makeCategory
	clear.addEventListener("click", clearData);
	displayData.addEventListener("click", getData);
	saveData.addEventListener("click", validate);
	makeCategory();
}