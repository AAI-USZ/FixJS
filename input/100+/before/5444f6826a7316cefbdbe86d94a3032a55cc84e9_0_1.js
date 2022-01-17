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