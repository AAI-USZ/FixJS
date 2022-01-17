function correctWord() {
//	if (err_type_chosen == false) { displayWarning(); } 
//	else {
		//$("#user_survey").before(getTrackChangesTable(num_corr));
		trackChanges(num_corr, span_start);
		if (moving_phrase) { commitMove(); } 
		else if (highlighting_mode == "insert") { commitInsert(); } 
		else { commitChange(); }
		cleanUpUI();
//	}
	return false; // to stop MTurk from submitting the form early
}