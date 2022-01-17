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