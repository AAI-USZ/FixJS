function validate(e) {
		//Define the elements that we want to check
		var getTaskName = $('taskName');
		var getGroup = $('groups');
		var getDueDate = $('dueDate');
		var getSpecialInstructions = $('specialInstructions');
		
		//Reset error messages
		errMsg.innerHTML = "";
		getTaskName.style.border = "1px solid black";
		getGroup.style.border = "1px solid black";
		getDueDate.style.border = "1px solid black";
		getSpecialInstructions.style.border = "1px solid black";

		
		//Get error messages
		var messageAry = [];
		
		// Task name validation
		if (getTaskName.value ===""){
			var taskNameError = "Please enter a task name";
			getTaskName.style.border = "1px solid red";
			messageAry.push(taskNameError);
		}	
		
		//Group validation
		if (getGroup.value==="-Choose a Location-"){
			var groupError = "Please choose a location";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		
		//Date validation
		if (getDueDate.value ===""){
			var dueDateError = "Please enter a due date";
			getDueDate.style.border = "1px solid red";
			messageAry.push(dueDateError);
		}

		// Details validation
		if (getSpecialInstructions.value ===""){
			var specialInstructionsError = "Please enter task details";
			getSpecialInstructions.style.border = "1px solid red";
			messageAry.push(specialInstructionsError);
		}
		
		//If there were errors, display them on the screen

		if(messageAry.length >=1){
			for(var i=0, j = messageAry.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}	
			e.preventDefault();
			return false;
		}else{
			//If all is okay, store our data.  Send the key value which came from our editData function
			//Remember it was passed from the editSubmit listener as a property
			storeData(this.key);
		}
	}