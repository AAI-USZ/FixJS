function(){

	//getElementsById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create select field element and populate with options
	function makeList(){
		var formTag = document.getElementsByTagName("form"),  // formTag is an array of all the form tags
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for (var i=0, j=locations.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = locations[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].priority;
		for (var i=0; i<radios.length; i++){
			if (radios[i].checked){
				priorityValue = radios[i].value;
			}
		}
	}
	
	//Make toggle controls when displaying the data
	function toggleControls(n){
		switch(n){
			case "on":
				$('honeyForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				$('listHeader').style.display = "inline";
				break;
			case "off":
				$('honeyForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				$('listHeader').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Store the form data in local storage
	function storeData(){
		//Generate a random number for a key
		var id 				= Math.floor(Math.random()*1000000001);
		//Figure out which radio button is selected
		getSelectedRadio();
		//Gather up all of our form field values and store in an object
		//Object properties are going to contain an array with the form label and input value.
		var item			= {};
			item.taskName 	= ["Task name:", $('taskName').value];
			item.group		= ["Location:", $('groups').value];
			item.dueDate	= ["Due date:", $('dueDate').value];
			item.importance	= ["Importance:", $('importance').value];
			item.priority 	= ["Because:", priorityValue];
			item.honey 		= ["List for:", $('forHoney').value];
			item.specialInstructions = ["Details:", $('specialInstructions').value];
		//Save data to local storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Honey Do Saved!");
	}
	
	//Display list
	function getData(){
		toggleControls("on");
		if (localStorage.length===0){
			alert("You don't have anything to do");
		}
		//Write data from local storage to the browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for (var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delet buttons for each item in local storage
		}
	}
	
	//Make item links
	//Will create edit and delete links for each stored item when displayed
	function makeItemLinks (key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Task";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Task";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the item from the Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form and hide the list
		toggleControls("off");
		
		//populate the form fields with the current localStorage values
		$('taskName').value = item.taskName[1];
		$('groups').value = item.group[1];
		$('dueDate').value = item.dueDate[1];
		$('importance').value = item.importance[1];
		//Set the radio button
		var radios = document.forms[0].priority;
		for (var i=0; i<radios.length; i++){
			if (radios[i].value == "I'm awesome" && item.priority[1] == "I'm awesome"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "I need to" && item.priority[1] == "I need to"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "I'm in trouble" && item.priority[1] == "I'm in trouble"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('specialInstructions').value = item.specialInstructions[1];
	
	}
	
	
	
	//Function to clear the local storage
	function clearLocal(){
		if (localStorage.length===0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All Honey Do items are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	
	//Variable defaults
	var locations = ["-Choose a Location-", "Home", "Car", "Errand"],
		priorityValue;

	//Run the makeList function to create the location dropdown
	makeList();
	
	//Set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

}