function(){
	//variables
	var billCategories = ["Credit", "Rent", "Utilities", "Misc"],
		paidValue;
	//Link and click events
	var displayData = ElId('displayData');
	displayData.addEventListener("click", getData);
	var clear = ElId('clear');
	clear.addEventListener("click", clearData);
	var saveData = ElId('submit');
	saveData.addEventListener("click", storeData);
	//getElementByID
	function ElId(x){
		var anElement = document.getElementById(x);
		return anElement;
	}
	// create category group elements and give options
	function makeCategory(){
		//formTag is array of form tags
		var formTag = document.getElementsByTagName("form"),
			selectLi = ElId('select'),
			createSelect = document.createElement('select');
		createSelect.setAttribute("id", "categories");
		for (var i = 0, j = billCategories.length; i < j; i++){
			var makeOption = document.createElement('option'),
				optText = billCategories[i];
			makeOption.setAttribute("value", billCategories[i]);
			makeOption.innerHTML = optText;
			createSelect.appendChild(makeOption);
		}
		selectLi.appendChild(createSelect);
	}
	// find radio button value
	function getRadio(){
		var radios = document.forms[0].billPaid;
		for(var i = 0; i < radios.length; i++){
			if(radios[i].checked){
				paidValue = radios[i].value;
			}	
		}
	}
	function toggle(b){
		switch(b){
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
	function storeData(){
		var id = Math.floor(Math.random() * 1000100001);
		//store form fields in object
		//object will contain arrat with form label and input value
		getRadio();
		var item = {};
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
	function clearData(){
		if(localStorage.length === 0){
			alert("No bills to clear!");
		}else{
			localStorage.clear();
			alert("All bills have been cleared.");
			window.location.reload();
			return false;
		}
	}
	function getData(){
		toggle("on");
		if(localStorage.length === 0){
			alert("No bills to display!");
		}
		//see local storage data in browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		//ElId('items').style.display = "block";
		for(var i =0, j = localStorage.length; i < j; i++){
			makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var	key = localStorage.key(i),
				value = localStorage.getItem(key),
				object = JSON.parse(value),
				makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var a in object){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = object[a][0] + " " + object[a][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	makeCategory();	
}