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
	}