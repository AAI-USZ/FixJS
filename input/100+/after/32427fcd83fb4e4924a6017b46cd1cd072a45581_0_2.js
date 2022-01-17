function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off")
		
		//populate the form fields with current localStorage values.
		g('groups').value = item.cats[1];
		//g('date').value = item.date[1];
	//	g('time').value = item.time[1];
		if(item.urgent[1] == "on"){
		g('urgent').setAttribute("checked", "checked");
		}
		g('slider1').value = item.slider1[1];
		g('date').value = item.date[1];
		g('textbox').value = item.textbox[1];
		g('time').value = item.time[1];
		g('taskname').value = item.taskname[1];
	
		//Remove the initial listener from the input 'save contact button'
		save.removeEventListener("click", storeData)
		//Change the submit button Value to Edit Button
		g('submit').value = "Edit Task";
		var editSubmit = g('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	
	}