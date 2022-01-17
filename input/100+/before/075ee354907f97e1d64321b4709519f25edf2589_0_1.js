function validate(e) {
		// Define the elements we want to check
		var getPetGroups = gebi("petGroups");
		var getPetName = gebi("petName");
		var getPetEmail = gebi("petEmail");
		
		// Resetting Error Messages
		errMsg.innerHTML = "";
		getPetGroups.style.border = "1px solid black";
		getPetName.style.border = "1px solid black";
		getPetEmail.style.border = "1px solid black";
		
		// Get Error Messages
		var messageArray = [];
		
		// Pet Type Validation
		if (getPetGroups.value === "--Choose A Pet Group--") {
			var petGroupsError = "Please choose a pet type.";
			getPetGroups.style.border = "2px solid red";
			messageArray.push(petGroupsError);
		};
		
		// Pet Name Validation
		if (getPetName === " ") {
			var petNameError = "Please enter a Kool Pet Name!";
			getPetName.style.border = "2px solid red";
			messageArray.push(petNameError);
		};
		
		// Email Validation
		var re = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
		var re2 = /^([a-z0-9])([\w\.\-\+])+([a-z0-9])\@((\w)([\w\-]?)+\.)+([a-z]{2,6})$/;
		if (!(re.exec(getPetEmail.value))) {
			var petEmailError = "Please enter a valid email address for your pet.";
			getPetEmail.style.border = "2px solid red";
			messageArray.push(petEmailError);
		};
		
/*		// Pet Gender Validation
		if (getGender === "") {
			var genderError = "Please pick a Pet Gender";
			getGender.style.border = "2px solid red";
			messageArray.push(genderError);
		};*/
		
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
	}