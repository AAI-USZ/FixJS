function() {
		var id				= Math.floor(Math.random()*1000001);
		// Gather round ye olde form field values, and store in ye olde objects.
		// Object props contain array with the form label and input value.
		
		getSelectedRadio();
		getCheckboxValue();
		
		var item			= {};
			item.petType	= ["Pet Type:", gebi("petType").value];
			item.petName	= ["Pet Name:", gebi("petName").value];
			item.gender		= ["Gender:", genderValue];
			item.favepet	= ["Favorite Pet:", faveValue];
			item.yearBought	= ["Year Bought:", gebi("yearBought").value];
			item.koolness	= ["Koolness:", gebi("koolness").value];
			item.comments	= ["Comments:", gebi("comments").value];
		// Save data into Local Storage: Use Stringify to convert the object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Pet is saved to the Pokedex!");
	}