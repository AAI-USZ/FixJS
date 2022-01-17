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
	}