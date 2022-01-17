function(i, graph) { 
		url = constructUrl(graph.name)
		getData(url, 
		function(results) {
			for (var metricName in results) {
				resultMetricData = results[metricName];
				graphMetricData = graph.data[metricName];
				for (var j = 0; j < results[metricName].length; j++) {
					graphMetricData[j] = resultMetricData[j];
				}
				graph.data[metricName] = graphMetricData;
			}
			graph.object.update();
			metricData = null;
		});
	}