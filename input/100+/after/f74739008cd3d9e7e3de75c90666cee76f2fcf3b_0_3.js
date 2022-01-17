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
	}