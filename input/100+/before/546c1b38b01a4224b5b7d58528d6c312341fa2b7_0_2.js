function() {

     // id variables
    var opt= ["Select Chore Type", "Inside Job", "Outside Job", "Errand Run"],  //For New App...Change this to fit to new HTML
        urgencyValue;
	
        
    // getElementById Function
    function a(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
        
    // Creating Select elements and populate with options
    function makeType () {
        var formTag = document.getElementsByTagName("form"),
            selectLi = a('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute('id', 'choretype');  //fill 'choretype' with new id tag for select items.
        
        for (var i=0, j=opt.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = opt[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    //Function to find value of radio buttons
    function getSelectedRadio() {
        var radios = document.forms[0].urgency;
        for(var i=0; i<radios.length; i++) {
            if(radios[i].checked) {
                urgencyValue = radios[i].value;
            }
        }
    }
    
    // toggle function that when displayButton is clicked, tells what to display when on and off.
    // On shows list form, and hides display button. Home and Clear buttons are built into the HTML.
    // Off means that the additem form is showing.
    function toggleControls(n) {
	switch(n) {
		case "on":
		        a('choreForm').style.display = "none";            //Change 'choreForm' to fit to new HTML tag for localStorage
			a('displayButton').style.display = "none";
			break;
		case "off":
			a('choreForm').style.display = "block";
			a('items').style.display = 'none';
			break;
		default:
			return false;
		}
     }
    
    function storeData(key) {
        // If no key, this is a new item and need new key.
	if(!key) {
		var id = Math.floor(Math.random()*100000001);
	}else{
		//Set the id to the existing key that is being edited so that it will save over the data.
		//The key is the same key that's been passed along from the editSubmit event handler.
		//to the validate function, and then passed here, into the storeData function.
		id = key;
	}
	
        //Gathering all form values, storing into an object
        // Object contains array with the form label and input value
        getSelectedRadio();
        var item= {};
            item.choretype = ["Chore Type:", a('choretype').value];		//Change these to fit new form tags and id's
            item.chorename = ["Chore Name:", a('chorename').value];
	    item.finishby  = ["Finish By:", a("finishby").value];
	    item.urgency   = ["Is this chore Urgent?:", urgencyValue];
            item.difficulty= ["Difficulty:", a('difficulty').value];
            item.chorenotes= ["Chore Notes:", a('chorenotes').value];
        
        // Save data to local storage, use Stringify to convert object to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Chore Saved!");			// Change to fit form type
            
     }
    
  function getData() {
        //write data from local storage
	// call the toggleControls function
	toggleControls("on");
	// tells function if the data is empty then you will be alerted and will revert back to form with display button missing
	if(localStorage.length === 0) {
		alert('There are no chores at this time.');		//change to fit form type
		toggleControls("off");
	}
	// adding elements into HTML and displaying from JS
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
	makeList.setAttribute("class", "choreList");	//change 'choreList' to fit new HTML
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
	a('items').style.display = 'block';
        for (var i=0, len=localStorage.length; i<len; i++) {
            var makeli = document.createElement('li');
	    var linksLi = document.createElement('li');
	    makeli.setAttribute("class", "eachChore");	//Change 'eachChore'to fit form type ie eachContact, etc.
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            //Convert the string from local storage to an object
            var object = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            for(var n in object) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = object[n][0] + " " +object[n][1];
                makeSubli.innerHTML = optSubText;
		makeSubList.appendChild(linksLi);
            }
	    makeItemLinks(localStorage.key(i), linksLi); // Create the edit and delete buttons/links for each item in local storage
        }
    }
    
    // Create edit and delete links for each stored item when displayed
    function makeItemLinks(key, linksLi) {
	//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = '#';
	editLink.key = key;
	var editText = "Edit Chore";		//Change to fit form type ie Edit Contact
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
	var deleteText = "Delete Chore";		//Change to fit form type
	deleteLink.setAttribute("class", "deleteLink");
	deleteLink.addEventListener('click', deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
	
    }
    
    function editItem() {
	// Getting data from local storage
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	// Show data in form
	toggleControls('off');
	
	// populating the form with data from local storage
	a('choretype').value = item.choretype[1];		//change id's to fit html and form type
	a('chorename').value = item.chorename[1];		//change id's to fit html and form type
	a('finishby').value = item.finishby[1];			//change id's to fit html and form type
	var radios = document.forms[0].urgency;
	for(var i=0; i<radios.length; i++) {
		if(radios[i].value == "Yes" && item.urgency[1] == "Yes") {		//Change id tags to fit html
			radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value === "No" && item.urgency[1] == "No") {
			radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value === "Somewhat" && item.urgency[1] == "Somewhat") {
			radios[i].setAttrubute("checked", "checked");
		}
	}
	
	a('difficulty').value = item.difficulty[1];		//Change to fit html and form type
	a('chorenotes').value = item.chorenotes[1];
	
	//remove the initial listener from the input submitButton
	submitButton.removeEventListener("click", storeData);
	//change submitButton value to Edit button
	a('submitButton').value = "Edit Chore";		//change to fit form type
	var editSubmit = a('submitButton');
	// save key value established in this function as a property of the editSubmit event
	// so we can use that value when we save the data we edited.
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
    }
    
    function deleteItem() {
	var ask = confirm("Are you sure you want to delete this chore?"); 	//Change to fit form type
	if(ask){
		localStorage.removeItem(this.key);
		window.location.reload();
	}else{
		alert("Chore was not deleted!");	//change to fit form type
		window.location.reload();
		return false;
	}
    }
    
    function clearLocal() {
	if(localStorage.length === 0) {
		alert('There is no data to clear.');
	} else {
		localStorage.clear();
		alert('All chores are deleted.');
		window.location.reload();
		return false;
	}
    }
    var errMsg = a('errors');
    errMsg.setAttribute("class", "errMsg");
    function validate(e) {
	// Defining elements to validate
	var getChoreType = a('choretype');	//change var's and id's to fit form type
	var getChoreName = a('chorename');
	var getFinishBy  = a('finishby');
	
	//reset error messages
	errMsg.innerHTML = "";
	getChoreName.style.border = "1px solid black"; //change var's and id's to fit form type
	getFinishBy.style.border = "1px solid black";

	
	
	//Get Error messages for empty required field
	var messageArray = [];
	
	//Chore Type validation
	if(getChoreType.value === "Select Chore Type") {		//Change to fit form type
		var typeError = "!!!Please choose a chore type!!!";
		getChoreType.style.border = "3px solid red";
		messageArray.push(typeError);
	}
	
	//Chore Name Validation
	if(getChoreName.value === "") {
		var choreNameError = "!!!Please enter a chore name!!!";		//Change to fit form type
		getChoreName.style.border = "3px solid red";
		messageArray.push(choreNameError);
	}
	
	//Finish By Validation
	if(getFinishBy.value === "") {
		var finishByError = "!!!Please enter a finish date!!!";		//Change to fit form type
		getFinishBy.style.border = "3px solid red";
		messageArray.push(finishByError);
	}
	
	// Display errors if any on the screen.
	if(messageArray.length >=1) {
		for(var i=0, j= messageArray.length; i<j; i++) {
			var text = document.createElement('li');
			text.innerHTML = messageArray[i];
			errMsg.appendChild(text);
		}
		e.preventDefault();
		return false;
	}else{
		storeData(this.key);
	}
	
    }
    
    // function calls
    makeType();
    
    // Button Action functions
    var displayButton = a('displayButton');
    displayButton.addEventListener("click", getData);
    
    var clearButton = a('clearButton');
    clearButton.addEventListener("click", clearLocal);
    
    var submitButton = a('submitButton');
    submitButton.addEventListener("click", validate);
    
    
    
}