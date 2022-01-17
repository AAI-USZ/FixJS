function(element) {
		var timestamp = $(element).attr("datetimestamp");
		return getToolTip(timestamp);
	}, { skin: 'kvasbo', showDelay: '450' }