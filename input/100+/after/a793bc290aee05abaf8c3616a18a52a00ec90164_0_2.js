function() {
    
    // id variables
    var opt= ["--Select Chore Type--", "Inside Job", "Outside Job", "Errand Run"],
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
            makeSelect.setAttribute('id', 'choretype');
        
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
    
    function toggleControls(n) {
	switch(n) {
		case "on":
			a('choreForm').style.display = "none";
			a('clearButton').style.display = "inline";
			a('displayButton').style.display = "none";
			a('addNew').style.display = "inline";
			break;
		case "off":
			a('choreForm').style.display = "block";
			a('clearButton').style.display = 'inline';
			a('displayButton').style.display = 'inline';
			a('addNew').style.display = 'none';
			a('items').style.display = 'none';
			break;
		default:
			return false;
	}
    }

    
    function storeData() {
        var id = Math.floor(Math.random()*10000001);
        //Gathering all form values, storing into an object
        // Object contains array with the form label and input value
        getSelectedRadio();
        var item= {};
            item.choretype = ["Chore Type:", a('choretype').value];
            item.chorename = ["Chore Name:", a('chorename').value];
            item.urgency   = ["Is this chore Urgent?:", urgencyValue];
            item.difficulty= ["Difficulty:", a('difficulty').value];
            item.finishby  = ["Finish By:", a("finishby").value];
            item.chorenotes= ["Chore Notes:", a('chorenotes').value];
            
        // Save data to local storage, use Stringify to convert object to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Chore Saved!");
            
    }
    
    function getData() {
        //write data from local storage
	toggleControls("on");
	if(localStorage.length === 0) {
		alert('There are no chores at this time.');
	}
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
        
	
	
	/*ct = a('choretype'),
        cn = a('chorename'),
        urg= a('urgent'),
        fin= a('finishby'),
        dif= a('difficulty'),
        notes= a('chorenotes');*/
    
    // function calls
    makeType();
    
    
    
    // Button Action functions
    var displayButton = a('displayButton');
    displayButton.addEventListener("click", getData);
    
    var clearButton = a('clearButton');
    clearButton.addEventListener("click", clearLocal);
    
    var submitButton = a('submitButton');
    submitButton.addEventListener("click", storeData);
    
}