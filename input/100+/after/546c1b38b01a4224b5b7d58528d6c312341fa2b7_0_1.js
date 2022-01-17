function getData() {
        //write data from local storage
	// call the toggleControls function
	toggleControls("on");
	// tells function if the data is empty then you will be alerted and will revert back to form with display button missing
	if(localStorage.length === 0) {
		alert('There are no chores at this time so default data was added.');		//change to fit form type
		//toggleControls("off");
		autoFillData(); //delete this for working model. uncomment toggleControls function above.
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
	    getImage(object.choretype[1], makeSubList);
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