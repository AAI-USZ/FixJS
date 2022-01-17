function(){	 




//getelementByID function
function $(x){
    var theElement = document.getElementById(x);
    return theElement;              
};


//Create Select field element and populate with options.
function makeSelect(){
    var formTag = document.getElementsByTagName("form"),//formTag is an arrray of all the form tags.
        selectLi = $("select"),
        makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "groups");
    for(var i=0, j=addAnEvent.length; i<j; i++) {
    	var makeOption = document.createElement("option");
    	var optText = addAnEvent[i];
    	makeOption.setAttribute("value", optText);
    	makeOption.innerHTML = optText;
    	makeSelect.appendChild(makeOption);

    }  
    selectLi.appendChild(makeSelect);

}

//Finc value of selected radio button
function getSelectedRadio(){
	var radios = document.forms[0].same;
	for(var i=0; i<radios.length; i++){
		if(radios[i].checked){
			zodiacValue = radios[i].value;

		}
		

	}

}

function toggleControls (n) {
	switch(n){
		case "on":
		    s("momentForm").style.display ="none";
		    s("clear").style.display = "inline";
		    s("displayLink").style.display ="none";
		    s("addNew").style.display= "inline";
		    break;
		case "off":
		    s("momentForm").style.display ="block";
		    s("clear").style.display = "inline";
		    s("displayLink").style.display ="inline";
		    s("addNew").style.display= "none";
		    s("items").style.display = "none";
		    break;   
		 default:
		    return false;    

	}
	// body...
}
//function getCheckboxValue(){
//	if($("yes").checked){
//		yesValue=
 //   }else{
 //       yesValue="No"
 //   }
//	}


//}



function storeData(){
	var id           = Math.floor(Math.random()*100000001);
	//gather up all form field values and store in an object.
	//Object properties contain array with the form label and input value.
	getSelectedRadio();
	var item                ={};
	   // item.addanevent     =["Add An Event:", $("addanevent").value];
	    item.names          =["Name:", $("names").value];
	    item.when           =["When:",$("when").value];
	    item.what           =["What:",$("what").value];
	    item.where          =["Where:",$("where").value];
	    item.startd         =["Start Date:",$("startd").value];
	    item.endd           =["End Date:", $("endd").value];
	    item.addnotes       =["Add Notes:",$("addnotes").value];
	    item.zodiac         =["Are your Zodiac signs compatible?:", zodiacValue];
	    item.range          =["Rate My Lover:",$("range").value]; 
	 //save data ito local storage: Use stringify to convert object to a string.
	 localStorage.setItem(id, JSON.stringify(item));
	 alert("Memory is Saved!");



}

function getData() {
	toggleControls("on");
	if(localStorage.length===0){
		alert("There is no data in Local Storage.");
	}
	// Write Data from local storage
	var makeDiv = document.createElement("div");
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement("ul");
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeli =document.createElement("li");
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//convert to string from local storage value back to an object by using JSON.parse()
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeli.appendChild(makeSubList);
		for(var n in obj){
			var makeSublist = document.createElement("li");
			makeSublist.appendChild(makeSubli);
			var optSubText = obj [n] [0] + " "+obj[n][1];
			makeSubli.innerHTML = optSubText;

		}
	}
}

function clearLocal () {
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All events are deleted");
		window.location.reload();
		return false;
	}	
	

}

//Variable defaults
var addAnEvent =[
   "--Choose Your Moment--", 
   "First Met", 
   "First Date",
   "First Kiss",
   "First Said I Love You!", 
   "Our Song",
   "--Choose Something Else--",
   "Our Names",
   "Relationship Status",
   "Calculate Time Together",
   "Note A Special Moment",
],
   zodiacValue
;
  
makeSelect();




//Set Link and Submit click events
var displayLink = $("displayLink");
displayLink.addEventListener("click",getData);
var clearLink=$("clear");
clearLink.addEventListener("click",clearLocal);
var save = $("submit");
save.addEventListener("click",storeData);


});
