function toggleControls (n) {
	switch(n){
		case "on":
		    $("momentForm").style.display ="none";
		    $("clear").style.display = "inline";
		    $("displayLink").style.display ="none";
		    $("addNew").style.display= "inline";
		    break;
		case "off":
		    $("momentform").style.display ="block";
		    $("clear").style.display = "inline";
		    $("displayLink").style.display ="inline";
		    $("addNew").style.display= "none";
		    $("items").style.display = "none";
		    break;   
		 default:
		    return false;    

	}
	// body...
}