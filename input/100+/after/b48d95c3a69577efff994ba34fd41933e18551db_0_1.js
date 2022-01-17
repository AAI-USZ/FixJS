function constructWidgets() {
	var graphWidgets = document.querySelectorAll('.graph-widget'); 
    for (var i = 0; i < graphWidgets.length; i++) {
		var widgetElement = graphWidgets[i];
		var graphElement = widgetElement.querySelector('.graph');
		var legend = widgetElement.querySelector('.legend');
		var hoverLegend = widgetElement.querySelector('.hover-legend');
		var widgetName = $.trim(widgetElement.id);
		var widgetConfig = config.widgets[widgetName];
		var graphObject = null;
		var graphData = {};

		// build the structures needed for each metric
		var j = 0;
		var metricSeries = [];
		for (var metricName in widgetConfig.metrics) {
			var metric = widgetConfig.metrics[metricName];

			graphData[metricName] = [{ x:0, y:0 }];
			var metricColor = metric.color || DEFAULT_GRAPH_COLOUR;
			metricSeries[j] = {
				data: graphData[metricName],
				color: metricColor,
				name: metricName
			}

			constructMetricKey(legend, metricName, metric.title, metricColor);
			constructMetricKey(hoverLegend, metricName, metric.title, metricColor);

			j++;
		}

		graphObject = new Rickshaw.Graph({
			element: graphElement,
			renderer: 'line',
			series: metricSeries
		});
		
		var xAxis = new Rickshaw.Graph.Axis.Time({
			graph: graphObject 
		});

		var yAxis = new Rickshaw.Graph.Axis.Y({
			element: widgetElement.querySelector('.y-axis'),
			orientation: 'left',
			graph: graphObject,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
		});

		graphObject.render();

		graphs[i] = {
			name: widgetName,
			data: graphData,
			object: graphObject,
			containerElement: widgetElement
		};

		var hover = new Hover(graphs[i], widgetConfig.metrics, legend, hoverLegend);
	}
}