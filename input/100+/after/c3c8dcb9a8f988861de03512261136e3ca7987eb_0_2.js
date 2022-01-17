function(i, graph) { 
		url = constructUrl(graph.name);
		getData(url, 
		function(results) {
			for (metricName in results) {
				resultMetricData = results[metricName];
				graphMetricData = graph.data[metricName];
				for (j = 0; j < resultMetricData.length; j++) {
					graphMetricData[j] = resultMetricData[j];
				}
				graph.data[metricName] = graphMetricData;
			}

			if (graph.name == 'multiple-metrics')
				console.log(graph.data);
			graph.object.update();
			metricData = null;
		});
	}