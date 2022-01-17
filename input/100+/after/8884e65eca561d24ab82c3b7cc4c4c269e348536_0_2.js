function storeData(){
	var id           = Math.floor(Math.random()*100000001);
	//gather up all form field values and store in an object.
	//Object properties contain array with the form label and input value.
	getSelectedRadio();
	var item                ={};
	    item.event          =["Add An Event:", $("events").value];
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