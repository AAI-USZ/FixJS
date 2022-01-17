function getOptions() {
	var opts = '<ul id="nav"> <li><a>Choose Error Type</a> <ul>';
	if(current_step == "change"){
		opts = errorChoices["all"];
	}else if(current_step == "delete"){
		opts = errorChoices["all"];
	}else if(current_step == "reorder"){
		opts = errorChoices["all"];
	} else if(highlighting_mode == "insert"){
		opts = errorChoices["all"];
	}
	return opts;
}