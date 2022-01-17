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
	}