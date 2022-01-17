function updateLog() {
	var filteredData = logData.filter(function(d) {
		return (showTrace && d.level === 'trace') ||
			(showDebug && d.level === 'debug') ||
			(showInfo && d.level === 'info') ||
			(showWarn && d.level === 'warn') ||
			(showError && d.level === 'error') ||
			(showFatal && d.level === 'fatal');
	})
	
	var logs = d3.select('#log').selectAll('div')
		.data(filteredData);
	
	var logLine = function(d) {
		d.attr('class', function(d) { return d.level; })
		.text(function(d) { return d.message; })
	}
	
	logs.enter().insert('div', ':first-child')
		.call(logLine);
	
	logs.transition()
		.call(logLine);
	
	logs.exit()
		.remove();
}