function makeItemLinks(key, linksLi){
		  //add edit single item link
		  var editLink = document.createElement('a');							//Creates anchor tag
		  editLink.href = "#";													//sets the value to pound tag
		  editLink.key = key;													//gets the key for the item being edited
		  var editText = "Edit Comic";									    	//Creates text of Edit comic	
		  editLink.addEventListener("click", editItem);							//Adds the event listener for the edit item link
		  editLink.setAttribute("class","sublinks");                            //Adds class sublinks for css
		  editLink.innerHTML = editText;										//adds the link to the html
		  linksLi.appendChild(editLink);										//by appending the edit link
		  
		  //add line break
		  var breakTag = document.createElement('br');							//Adds a break to create the element spacing
		  linksLi.appendChild(breakTag);										//Appends the break tag
		  
		  //add delete single item link
		  var deleteLink = document.createElement('a');							//adds an anchor tag for the delete link
		  deleteLink.href = "#";												//adds the link value to pound going same page
		  deleteLink.key = key;													//sets the key to the comic being deleted
		  var deleteText = "Delete Comic";										//creates the text to delete the comic
		  deleteLink.addEventListener("click", deleteItem);						//adds the event listener to delete the item
		  deleteLink.setAttribute("class","sublinks");
		  deleteLink.innerHTML = deleteText;									//adds the link to the html
		  linksLi.appendChild(deleteLink);										//appends the deletelink child 
	  }