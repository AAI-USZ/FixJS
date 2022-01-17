function(data, redraw) {
	redraw = typeof redraw !== 'undefined' ? redraw : false;


	var startDate = getStartDate(data);
	var endDate = getEndDate(data);

	if(filterIsOn()) {
		data = filterDate(data, startDate, endDate);
	}

	drawDailyChart(data, startDate, endDate, redraw);
	drawHourlyChart(data, startDate, endDate, redraw);
}