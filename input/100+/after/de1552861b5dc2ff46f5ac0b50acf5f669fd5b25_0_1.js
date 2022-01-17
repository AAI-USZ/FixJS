function makeItemLinks(key, linksLi) {
	//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = '#';
	editLink.key = key;
	var editText = "Edit Chore";
	editLink.setAttribute("class", "editLink");
	editLink.addEventListener('click', editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	//add line break
	//var breakTag = document.createElement('br');
	//linksLi.appendChild(breakTag);
	
	// delete Link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Chore";
	deleteLink.setAttribute("class", "deleteLink");
	deleteLink.addEventListener('click', deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
	
    }