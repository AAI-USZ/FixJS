function(){
	
	// getElementById Function
	function a(id) {
		var theElement = document.getElementById(id);
		return theElement;
	};
		
	// Creating Select elements and populate with options
	function makeType () {
		var 	formTag = document.getElementsByTagName("form"),
			selectLi = a('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute('id', 'choretype');
		
		for (var i=0; j=opt.length, i<j; i++){
			var makeOption = document.createElement('choretype');
			var optText = opt[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};
	
	//Function to find value of radio buttons
	function getSelectedRadio() {
		var radios = document.forms[0].urgency;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked) {
				urgencyValue = radios[i].value;
			};
		};
	};
	
	function storeData() {
		var id = Math.floor(Math.random()*19990009);
		//Gathering all form values, storing into an object
		// Object contains array with the form label and input value
		var item= {};
		    item.choretype = ["Chore Type:", a('choretype').value];
		    item.chorename = ["Chore Name:", a('chorename').value];
		    //item.urgency    = ["Is this chore Urgent?:", urgencyValue];
		    item.difficulty= ["Difficulty:", a('difficulty').value];
		    item.finishby  = ["Finish By:", a("finishby").value];
		    item.chorenotes= ["Chore Notes:", a('chorenotes').value];
		    
		// Save data to local storage, use Stringify to convert object to string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Chore Saved!");
		    
	};
	
	
	// id variables
	var	opt= ["blank", "inside", "outside", "errand"],
		ct = a('choretype'),
		cn = a('chorename'),
		urg= a('urgent'),
		fin= a('finishby'),
		dif= a('difficulty'),
		notes= a('chorenotes');
	
	// function calls
	makeType();
	
	// Button Action functions
	var displayButton = a('display');
	displayButton.addEventListener("click", getData);
	
	var clearButton = a('clear');
	clearButton.addEventListener("click", clearLocal);
	
	var submitButton = a('submitbutton');
	submitButton.addEventListener = a("click", storeData);
	
}