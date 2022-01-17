function editItem(){
		//Grab the Data for our item from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		//populate the form fields with the current localStorage values.
		$('buffName').value = item.name[1];
		$('buffType').value = item.type[1];
		$('buffRounds').value = item.rounds[1];
		var radios = document.forms[0].prereq;
		for(var i=0; i<radios.length; i++){ //This is the check for the Radio Buttons
			if(radios[i].value == "yes" && item.prereq[1] == "yes"){
				radios[i].setAttribute("checked", "checked");
			}else{
				radios[i].setAttribute("checked", "checked");
			};
		};
		$('description').value = item.description[1];
		$('dateAdded').value = item.date[1];
		//repeat format for items to fill
		
		
		//remove the initial listener from the event
		save.removeEventListener("click", storeData);
		//Change Submit button Value to Edit Button
		$('submit').value = "Save Edit";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit event so we can se that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	}