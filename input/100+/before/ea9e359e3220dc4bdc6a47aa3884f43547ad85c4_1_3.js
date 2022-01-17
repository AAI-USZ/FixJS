function editItem(){
		  //Grab the data from our item from Local Storage
		  var value = localStorage.getItem(this.key);							//gets the item the selected key item from localStorage
		  var item = JSON.parse(value);											//parses the retrieved value
		  
		  //Show the form
		  toggleControls("off");												//shows the form
		  
		  //populate the form fields with current localStorage values.
		  ge('groups').value = item.publisher[1];								//gets the stored key value of publisher
		  ge('cname').value = item.cname[1];										//gets the stored key value of the comic name
		  ge('iname').value = item.iname[1];										//gets the stored key value element of issue
		  ge('email').value = item.email[1];										//gets the stored key value element of email 
		  var radios = document.forms[0].haveit;								//checks the value of the radio stored button value
		  for(var i=0; i<radios.length; i++){									//itterate the radio set
			  if(radios[i].value == "Yes" && item.haveit[1] == "Yes"){			//checking which values should be set
				  radios[i].setAttribute("checked", "checked");
			  }else if(radios[i].value == "No" && item.haveit[1] == "No"){		//if not yes value set the no value in set
				  radios[i].setAttribute("checked", "checked");
			  }
		  }
		  if(item.need[1] == "Yes"){											//reviews the checkbox to see if it should be checked
			  ge('need').setAttribute("checked", "checked");
		  }
		  ge('rating').value = item.rating[1];									//calls the rating value by key
		  document.forms[0].display_rate.value = item.rating[1];                //sets the visible rating 
		  ge('date').value = item.date[1];										//gets the date value by key
		  ge('notes').value = item.notes[1];										//gets the stored notes value by key
		  
		  //Remove the intial listener from the input 'save comic' button.
		  save.removeEventListener("click", storeData);
		  
		  //change Submit Button value to Edit Button
		  ge('submit').value = "Edit Comic";
		  var editSubmit = ge('submit');
		  //Save the key value established in this function as a property of the editSubmit event
		  //so we can use that value when we save the data we edited
		  editSubmit.addEventListener("click", validate);						//sets the validate listener to the edit submit
		  editSubmit.key = this.key;											//sets to key to the selected key edited
	  }