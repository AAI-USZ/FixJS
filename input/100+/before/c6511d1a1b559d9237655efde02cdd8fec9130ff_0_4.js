function editItem(){
		//Grab the item from the Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form and hide the list
		toggleControls("off");
		
		//populate the form fields with the current localStorage values
		$('taskName').value = item.taskName[1];
		$('groups').value = item.group[1];
		$('dueDate').value = item.dueDate[1];
		$('importance').value = item.importance[1];
		//Set the radio button
		var radios = document.forms[0].priority;
		for (var i=0; i<radios.length; i++){
			if (radios[i].value == "I'm awesome" && item.priority[1] == "I'm awesome"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "I need to" && item.priority[1] == "I need to"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "I'm in trouble" && item.priority[1] == "I'm in trouble"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('specialInstructions').value = item.specialInstructions[1];
	
	}