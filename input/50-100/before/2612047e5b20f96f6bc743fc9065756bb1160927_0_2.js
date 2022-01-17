function getOptions() {
	var opts = '<ul id="nav"> <li><a>Choose Error Type</a> <ul>';
	if(current_step == "change"){
		opts = errorChoices["all"];
	}else if(current_step == "delete"){
		opts = errorChoices["delete"];	
	}else if(current_step == "reorder"){
		opts = errorChoices["move"];	
	} else if(highlighting_mode == "insert"){
		opts = errorChoices["insert"];	
	}
	return opts;
}