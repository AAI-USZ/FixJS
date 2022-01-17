function(data) {
	var endDate = new Date();

	if(!filterIsOn()) {
		return moment(endDate);
	} else {
		return moment($("#after-date").val());
	}
}