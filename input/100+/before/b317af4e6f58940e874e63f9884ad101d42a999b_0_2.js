function updateLegendValues(graph) {
	var graphWidget = graph.containerElement; 
	var legend = graphWidget.querySelector('.legend');
	var timeLabel = legend.querySelector('.graph-time-label');

	var lastX = -1;
	var metrics = config.widgets[graph.name].metrics;
	for (metricName in metrics) {
		var valueLabel = legend.querySelector('#metric-key-value-label-' + metricName);
		var metricData = graph.data[metricName];
		var lastCoord = metricData[metricData.length-1];
		var lastValue = YFormatter(lastCoord.y);
		if (lastCoord.x > lastX)
			lastX = lastCoord.x;
		valueLabel.innerHTML = lastValue;
		valueLabel.className = 'metric-key-value-label inactive';
	}

	timeLabel.innerHTML = XFormatter(lastX);
}