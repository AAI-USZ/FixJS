function storeData(key){
		//if there is no key, this is a new item and will need a key
		if (!key){
			//Generate a random number for a key
			var id 				= Math.floor(Math.random()*1000000001);
		}else{
			//otherwise we will use the existing key and overwrite the existing data
			//It's the same key that was passed from the edit submit event handlewr through validate function
			//then passed here into the store data function
			id = key;
		}
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