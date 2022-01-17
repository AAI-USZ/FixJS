function voteProfessor(data){

	var ajaxstatus = data.status; // Can be "begin", "complete" and "success"
	var source = $(data.source);
	var voteControl = source.parent().parent();
	var voteCount = $('#professor-rating');

	switch (ajaxstatus) {
		case "begin": // This is called right before ajax request is been sent.
			voteControl.hide();
			voteControl.parent().spin("small");
			voteCount.spin("tiny");
			break;

		case "success": // This is called when ajax response is successfully processed.
			voteControl.show();
			voteControl.parent().spin(false);
			//voteCount.spin(false);
			break;

		case "complete": // This is called right after ajax response is received.
			// NOOP.
			break;
	}
}