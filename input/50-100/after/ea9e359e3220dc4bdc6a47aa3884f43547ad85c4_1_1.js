function makeComics(){
         var     formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags
		         getSelect = ge('groups');                        //assignment for select element
         if(getSelect){
	         for(var i=0, j=comicGroups.length; i<j; i++){  		  //itterate over the options for the comicgroups variable
	             var makeOption = document.createElement('option');   //adds the option if item is found in the array
	             var optText = comicGroups[i];						  //Adds the item in the array
	             makeOption.setAttribute("value", optText);			  //value for the option item
	             makeOption.innerHTML = optText;					  //makes inner html
	             getSelect.appendChild(makeOption);				  //appends to the child element
	         }
	     }
         
      }