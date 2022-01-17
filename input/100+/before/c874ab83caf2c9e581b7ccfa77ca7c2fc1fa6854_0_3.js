function(){
	
	// My Variables for the functions
	var petGroups = ["--Choose A Pet Type--", "Dogs", "Cats", "Rodents", "Birds", "Farm Animals"],
		genderValue,
		faveValue = "No"
	;

	// My getElementById or gebi function
	function gebi(x){
		var theElement = document.getElementById(x);
		return theElement;
	};
	
	// Create select field element and populate with options.
	var makeCats = function() {
		var formTag = document.getElementsByTagName("petForm"),
			selectLi = gebi("petsType"),
			makeSelect = document.createElement("petType");
			makeSelect.setAttribute("id", "petType");
		for(var i=0, j=petGroups.length; i<j; i++) {
			var makeOption = document.createElement("option");
			var optTxt = petGroups[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};
	
	// Find the value of selected radio button.
	function getSelectedRadio() {
		var radio = document.forms[0].gender;
		for (var i=0; i<radio.length; i++) {
			if (radio[i].checked) {
				genderValue = radio[i].value;
			};
		};
	};
	
	// Finds the value of the Checkbox
	function getCheckboxValue(){
		if (gebi("favePet").checked) {
			faveValue = gebi("favePet").value;
		} else {
			faveValue = "No";
		};
	};
	
	function toggleControls(n) {
		switch(n) {
			case "on":
				gebi("petForm").style.display = "none";
				gebi("clear").style.display = "inline";
				gebi("showData").style.display = "none";
				gebi("addNew").style.display = "inline";
				break;
			case "off":
				gebi("petForm").style.display = "block";
				gebi("clear").style.display = "inline";
				gebi("showData").style.display = "inline";
				gebi("addNew").style.display = "none";
				gebi("items").style.display = "none";
				break;
			default:
				return false;
		};
	};
	
	// My submit function
	var submit = function() {
		var id				= Math.floor(Math.random()*1000001);
		// Gather round ye olde form field values, and store in ye olde objects.
		// Object props contain array with the form label and input value.
		
		getSelectedRadio();
		getCheckboxValue();
		
		var item			= {};
			item.petType	= ["Pet Type:", gebi("petType").value];
			item.petName	= ["Pet Name:", gebi("petName").value];
			item.gender		= ["Gender:", genderValue];
			item.favepet	= ["Favorite Pet:", faveValue];
			item.yearBought	= ["Year Bought:", gebi("yearBought").value];
			item.koolness	= ["Koolness:", gebi("koolness").value];
			item.comments	= ["Comments:", gebi("comments").value];
		// Save data into Local Storage: Use Stringify to convert the object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Pet is saved to the Pokedex!");
	};
	
	// My getData function
	var getData = function() {
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
			makeItemLinks(localStorage.key(i));
		};
	};
	
/*	// My Make Item Function
	// Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key) {
		// add edit single item link
		var editLink = document.createElement("a");
		var editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Pet";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		
	};
*/
	
	// My Clear Data Function
	var clearDataStorage = function() {
		if(localStorage.length === 0) {
			alert("No Kool Pets have been added to the PokeDex.");
		} else {
			localStorage.clear();
			alert("All Kool Pets have been set free!");
			window.location.reload();
			return false;
		};
	};
/*	
	// My Show Array Function
	var showArray = function() {
		// Supposed to show something here.
		return true;
	};
*/	
	
/*	// Validating the form elements
	function validForm() {
		var getEmail = document.forms[0]["email"].value;
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (!(re.exec(getEmail))) {
			error = "Please enter a valid email address.\n";
		};
		if (error) alert(error);
	};
*/
	
/*	// My Variables for the functions
	var petGroups = ["--Choose A Pet Type--", "Dogs", "Cats", "Rodents", "Birds", "Farm Animals"],
		genderValue,
		faveValue = "No"
	;*/
	
	makeCats();
	
	var saveData = gebi("submit");
	saveData.addEventListener("click", submit);
	var showData = gebi("showData");
	showData.addEventListener("click", getData);
	var clearLink = gebi("clear");	
	clearLink.addEventListener("click", clearDataStorage);

	
}