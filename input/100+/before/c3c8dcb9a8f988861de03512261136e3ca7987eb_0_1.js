function constructWidgets() {
	graphElements = document.querySelectorAll('.graph'); 
    for (var i = 0; i < graphElements.length; i++) {
		widgetName = $.trim(graphElements[i].id);
		widgetConfig = config.widgets[widgetName];

		graphs[i] = {
			name: widgetName,
			data: {},
			object: undefined
		};

		j = 0;
		metricSeries = [];
		for (var metricName in widgetConfig.metrics) {
			metric = widgetConfig.metrics[metricName]

			graphs[i].data[metricName] = [{ x:0, y:0 }];
			metricColor = (metric.color === undefined) ? DEFAULT_GRAPH_COLOUR : metric.color;
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