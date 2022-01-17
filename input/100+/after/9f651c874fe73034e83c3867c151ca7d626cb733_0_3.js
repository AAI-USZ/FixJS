function getData() {
        //write data from local storage
	// call the toggleControls function
	toggleControls("on");
	// tells function if the data is empty then you will be alerted and will revert back to form with display button missing
	if(localStorage.length === 0) {
		alert('There are no chores at this time.');
		toggleControls("off");
	}
	// adding elements into HTML and displaying from JS
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
	makeList.setAttribute("class", "choreList");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
	a('items').style.display = 'block';
        for (var i=0, len=localStorage.length; i<len; i++) {
            var makeli = document.createElement('li');
	    makeli.setAttribute("class", "eachChore")
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
            }
            
        }
    }