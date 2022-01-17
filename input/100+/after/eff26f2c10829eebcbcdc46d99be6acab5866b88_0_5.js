function(){
	
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	};
	
	//Variable Defaults
	var radioValue,
		checkValue,
		errorMsg = $('errors');
	
	//Toggle Controls Function
	function toggleControls(n){
		switch(n){
			case "on":
				$('buffForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addBuff').style.display = "inline";
				break;
			case "off":
				$('buffForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addBuff').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				$('buffForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addBuff').style.display = "none";
				$('items').style.display = "none";
				break;
		};
	};
	//Store Data Function
	function storeData(key){
		var id;
		if(!key){
			id		= Math.floor(Math.random()*100000001); //Creating an ID number allows you to create multiple saves
		}else{
			id = key;
		};
		
		//gather up all our form field values and store them in an object.
		//Object properties contain an array that has the form label and the input values.
		getSelectedRadio(); //Sets the variable that is used in the object
		//getCheckboxValue(); //Same for checkbox
		var item				= {}; //Create the Object
			item.name			= ["Buff Name:", $('buffName').value]; //Assign it values based on the elements in the form using the getElementById function.
			item.type			= ["Buff Type:", $('buffType').value];//.value is the attribute that we use to store the user input.
			item.rounds			= ["Rounds:", $('buffRounds').value];
			item.prereq			= ["Prerequisite:", radioValue];
			item.description	= ["Description:", $('description').value];
			item.date			= ["Date Added:", $('dateAdded').value];
	
		//Save data into Local Storage; Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Buff Saved!");
	};
	
	//Validate Function
	function validate(e){
		//define the elements we check
		var getName = $('buffName');
		var getDescription = $('description');
//		var getEmail = $('email');
		
		//reset error messages
		errorMsg.innerHTML = "";
		
		//Create array for mass display of error messages
		var messageAry = [];
		
		//Group Validation
		if(getName.value === ""){
			var nameError = "Please enter a name for the buff.";
			getName.style.border = "1px solid red";
			messageAry.push(nameError);
		}else{
			getName.style.border = "1px solid green";	
		};
		
		if(getDescription.value === ""){
			var descriptionError = "Please enter a description.";
			getDescription.style.border = "1px solid red";
			messageAry.push(descriptionError);
		}else {
			getDescription.style.border = "1px solid green";
		};
		
/*
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1ps solid red";
			messageAry.push(emailError);
		};
		
*/
		//If there were errors, display them
		//requires that an HTML element exist in page already <ul id="errors"></ul>
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errorMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		}else{
			//Store data if no errors
			storeData(this.key);
		};
	};
	
	//Find value of selected Radio Button.
	function getSelectedRadio(){
		console.log("Ran getSelectedRadio function");
		var radios = document.forms[0].prereq;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				radioValue = radios[i].value;
			};
		};
	};
	
	//Find value of Checkbox
	function getCheckboxValue(){
		if($('checkboxId').checked){
			checkValue = $('checkboxId').value;
		} else {
			checkValue = "No";
		};
	};
	
	// GetData Function: Write data from local storage to the browser
	function getData(){
		toggleControls("on");
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value); //Converts the string in local storage back to an object
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			};
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete links for each item in local storage
		};
	};
	
	//Edit Item Function
	function editItem(){
		//Grab the Data for our item from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		//populate the form fields with the current localStorage values.
		$('buffName').value = item.name[1];
		$('buffType').value = item.type[1];
		$('buffRounds').value = item.rounds[1];
		var radios = document.forms[0].prereq;
		for(var i=0; i<radios.length; i++){ //This is the check for the Radio Buttons
			if(radios[i].value == "yes" && item.prereq[1] == "yes"){
				radios[i].setAttribute("checked", "checked");
			}else{
				radios[i].setAttribute("checked", "checked");
			};
		};
		$('description').value = item.description[1];
		$('dateAdded').value = item.date[1];
		//repeat format for items to fill
		
		
		//remove the initial listener from the event
		save.removeEventListener("click", storeData);
		//Change Submit button Value to Edit Button
		$('submit').value = "Save Edit";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit event so we can se that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	};
	
	//Delete Item Function	
	function deleteItem(){
		var ask = confirm("Are you sure want to remove this buff?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Buff removed.");
			window.location.reload();
		}else{
			alert("No changes made.");
		};
	};
	
	//Make item links function
	function makeItemLinks(key, linksLi){
		//Edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Buff";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Remove Buff";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};
	
	//Clear Local Storage
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("Data Cleared.");
			window.location.reload();
			return false;
		};
	};

	//Set Link & Submit Click Events
	var displayLink =$('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);
	var addBuffLink =$('addBuff');
	addBuffLink.addEventListener("click",toggleControls);
	
}