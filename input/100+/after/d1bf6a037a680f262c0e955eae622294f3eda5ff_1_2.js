function(){

	// My getElementById or gebi function
	function gebi(x){
		var theElement = document.getElementById(x);
		return theElement;
	};

	// My Variables for the functions
	var petGroups = ["--Choose A Pet Group--", "Dogs", "Cats", "Rodents", "Reptiles", "Birds", "Farm Animals", "Mythical"];
	var	genderValue;
	var	faveValue = "No";
	var	errMsg = gebi("errors");

	// Create select field element and populate with options.
	function makeCats() {
		var formTag = document.getElementsByTagName("petForm"),
			selectLi = gebi("petsType"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "petGroups");
		for (var i=0, j=petGroups.length; i<j; i++) {
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
		var radio = document.forms[0].genderValue;
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
				gebi("clearData").style.display = "inline";
				gebi("showData").style.display = "none";
				gebi("addNew").style.display = "inline";
				break;
			case "off":
				gebi("petForm").style.display = "block";
				gebi("clearData").style.display = "inline";
				gebi("showData").style.display = "inline";
				gebi("addNew").style.display = "none";
				gebi("items").style.display = "none";
				break;
			default:
				return false;
		};
	};
	
	// My submit function
	function submit(key) {
		// If there isn't a key, this means this is a brand new item and we need a new key.
		if (!key) {
			var id				= Math.floor(Math.random()*1000001);
		} else {
			// Set the id to the existing key I'm editing so that it will save over the data.
			// The key is the same key that's been passed along from the editSubmit even handler
			// to the validate function, and then passed here, into the submit function.
			id					= key;
		};
		
		// Gather round ye olde form field values, and store in ye olde objects.
		// Object props contain array with the form label and input value.
		
		getSelectedRadio();
		getCheckboxValue();
		
		var item				= {};
			item.petGroups		= ["Pet Type:", gebi("petGroups").value];
			item.petName		= ["Pet Name:", gebi("petName").value];
			item.petEmail		= ["Pet Email:", gebi("petEmail").value];
			item.genderValue	= ["Gender:", genderValue];
			item.favePet		= ["Favorite Pet:", faveValue];
			item.birthDate		= ["Date of Birth:", gebi("birthDate").value];
			item.koolness		= ["Koolness:", gebi("koolness").value];
			item.comments		= ["Comments:", gebi("comments").value];
		// Save data into Local Storage: Use Stringify to convert the object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Pet saved to the Kool Pets List!");
	};

	// My getData function
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There are no Pets in the Kool Pets List so defaults pets were added.");
			autoFillData();
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
	};

/*	// This is to get images for the correct category.
	function getImage(catname, makeSubList) {
		imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "img/" + catName + ".png");
		imageLi.appendChild(newImg);
	};*/

	// My Auto Fill Local Storage Function
	function autoFillData() {
		// The actual JSON OBJECT data required for this to work is coming from the json.js file, which is loaded from the html page.
		// Store the JSON OBJECT into local storage.
		for(var n in json) {
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};

	// My Make Item Function
	// Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi) {
		// Add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Pet";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// Add my line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);


		// Add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Pet";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

	// My Edit Single Item Function
	function editItem() {
		// Grab data from the item local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// To show the form again
		toggleControls("off");
		
		// populate the form fields with current localStorage values.
		gebi("petGroups").value = item.petGroups[1];
		gebi("petName").value = item.petName[1];
		gebi("petEmail").value = item.petEmail[1];
		var radios = document.forms[0].genderValue;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value == "Male" && item.genderValue[1] == "Male") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "Female" && item.genderValue[1] == "Female") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "Unknown" && item.genderValue[1] == "Unknown") {
				radios[i].setAttribute("checked", "checked");
			};
		};
		if (item.favePet[1] == "Yes") {
			gebi("favePet").setAttribute("checked", "checked");
		};
		gebi("birthDate").value = item.birthDate[1];
		gebi("koolness").value = item.koolness[1];
		gebi("comments").value = item.comments[1];
		
		// Remove the initial listener from the input "save pet" button.
		submit.removeEventListener("click", submit);
		// Change Submit button Value to Edit Button
		gebi("submit").value = "Edit Pet";
		var editSubmit = gebi("submit");
		
		// Save the key value established in this function as a prop of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.addEvenListener("click", validate);
		editSubmit.key = this.key;
	};
	
	// My Delete Item Function
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this Kool Pet?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Kool Pet WAS deleted!!!");
			window.location.reload();
		} else {
			alert("Kool Pet was NOT deleted!");
		};
	};
	
	// My Clear Data Function
	function clearDataStorage() {
		if(localStorage.length === 0) {
			alert("No Kool Pets in the Kool Pets List.");
		} else {
			localStorage.clear();
			alert("All Kool Pets have been set free!");
			window.location.reload();
			return false;
		};
	};
	
	// My Validate Function
	function validate(e) {
		// Define the elements we want to check
		var getPetGroups = gebi("petGroups");
		var getPetName = gebi("petName");
		var getPetEmail = gebi("petEmail");
		var getGender = gebi("genderValue");
		
		// Resetting Error Messages
		errMsg.innerHTML = "";
		getPetGroups.style.border = "1px solid black";
		getPetName.style.border = "1px solid black";
		getPetEmail.style.border = "1px solid black";
		getGender.style.border = "1px solid black";
		
		// Get Error Messages
		var messageArray = [];
		
		// Pet Type Validation
		if (getPetGroups.value === "--Choose A Pet Type--") {
			var petGroupsError = "Please choose a pet type.";
			getPetGroups.style.border = "2px solid red";
			messageArray.push(petGroupsError);
		};
		
		// Pet Name Validation
		if (getPetName === "") {
			var petNameError = "Please enter a Kool Pet Name!";
			getPetName.style.border = "2px solid red";
			messageArray.push(petNameError);
		};
		
		// Email Validation
		var re = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
		var re2 = /^([a-z0-9])([\w\.\-\+])+([a-z0-9])\@((\w)([\w\-]?)+\.)+([a-z]{2,6})$/;
		if (!(re2.exec(getPetEmail.value))) {
			var petEmailError = "Please enter a valid email address for your pet.";
			getPetEmail.style.border = "2px solid red";
			messageArray.push(petEmailError);
		};
		
		// Pet Gender Validation
		if (getGender === "Unknown") {
			var genderError = "Please pick a Pet Gender";
			getGender.style.border = "2px solid red";
			messageArray.push(genderError);
		};
		
		// If there were errors, display them on the screen.
		if (messageArray.length >= 1) {
			for (var i=0, j=messageArray.length; i < j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		} else {
			// If all is OK, save the data! Send the key value (which came from the editData function).
			// Remember this key value was passed through the editSubmit event listener as a prop.
			submit(this.key);
		};
	};
	
	// My Variables for the functions
/*	var petGroup = ["--Choose A Pet Type--", "Dogs", "Cats", "Rodents", "Birds", "Farm Animals"],
		genderValue,
		faveValue = "No",
		errMsg = gebi("errors");
	;
*/
	
	makeCats();
	

	var showData = gebi("showData");
	showData.addEventListener("click", getData);
	var clearLink = gebi("clearData");	
	clearLink.addEventListener("click", clearDataStorage);
	var saveData = gebi("submit");
	saveData.addEventListener("click", validate);

}