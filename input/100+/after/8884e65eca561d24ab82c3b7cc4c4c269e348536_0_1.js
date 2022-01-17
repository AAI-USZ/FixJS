function makeEvents(){
    var formTag = document.getElementsByTagName("form"),//formTag is an arrray of all the form tags.
        selectLi = $("select"),
        makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "events");
    for(var i=0, j=addAnEvent.length; i<j; i++) {
    	var makeOption = document.createElement("option");
    	var optText = addAnEvent[i];
    	makeOption.setAttribute("value", optText);
    	makeOption.innerHTML = optText;
    	makeSelect.appendChild(makeOption);

    }  
    selectLi.appendChild(makeSelect);

}