function constructWidgets() {
	var graphElements = document.querySelectorAll('.graph'); 
    for (var i = 0; i < graphElements.length; i++) {
		var widgetName = $.trim(graphElements[i].id);
		var widgetConfig = config.widgets[widgetName];

		graphs[i] = {
			name: widgetName,
			data: {},
			object: undefined
		};

		var j = 0;
		var metricSeries = [];
		for (var metricName in widgetConfig.metrics) {
			var metric = widgetConfig.metrics[metricName];

			graphs[i].data[metricName] = [{ x:0, y:0 }];
			var metricColor = metric.color || DEFAULT_GRAPH_COLOUR;
			metricSeries[j] = {
				data: graphs[i].data[metricName],
				color: metricColor
			}

			j++;
		}
		
		graphs[i].object = new Rickshaw.Graph({
			element: graphElements[i],
			renderer: 'line',
			series: metricSeries
		});

		graphs[i].object.render();
	}
}