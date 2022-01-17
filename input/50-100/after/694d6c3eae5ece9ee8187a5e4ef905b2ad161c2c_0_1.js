function(data) {
	var startDate = new Date();

	if(!filterIsOn()) {
		for(var i = 0; i < data.length; i++) {
			dateObject = parseMysqlDate(data[i]["click_time"]);

			if(dateObject < startDate) {
				startDate = dateObject;
			}
		}
	} else {
		return moment($("#before-date").val());
	}

	return moment(startDate);
}