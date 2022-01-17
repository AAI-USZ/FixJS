function validate(e) {
	// Defining elements to validate
	var getChoreType = a('choretype');
	var getChoreName = a('chorename');
	var getFinishBy  = a('finishby');
	
	//reset error messages
	errMsg.innerHTML = "";
	getChoreName.style.border = "1px solid black";
	getFinishBy.style.border = "1px solid black";

	
	
	//Get Error messages for empty required field
	var messageArray = [];
	
	//Chore Type validation
	if(getChoreType.value === "Select Chore Type") {
		var typeError = "Please choose a chore type.";
		getChoreType.style.border = "1px solid red";
		messageArray.push(typeError);
	}
	
	//Chore Name Validation
	if(getChoreName.value === "") {
		var choreNameError = "Please enter a chore name";
		getChoreName.style.border = "1px solid red";
		messageArray.push(choreNameError);
	}
	
	//Finish By Validation
	if(getFinishBy.value === "") {
		var finishByError = "Please enter a finish date";
		getFinishBy.style.border = "1px solid red";
		messageArray.push(finishByError);
	}
	
	// Display errors if any on the screen.
	if(messageArray.length >=1) {
		for(var i=0, j= messageArray.length; i<j; i++) {
			var text = document.createElement('li');
			text.innerHTML = messageArray[i];
			errMsg.appendChild(text);
		}
		e.preventDefault();
		return false;
	}else{
		storeData(this.key);
	}
	
    }