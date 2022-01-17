function(results) {
			for (var metricName in results) {
				var resultMetricData = results[metricName];
				var graphMetricData = graph.data[metricName];
				graphiteMetricData = resultMetricData

				for (var j = 0; j < resultMetricData.length; j++) {
					graphMetricData[j] = resultMetricData[j];
				}
			}
			graph.object.update();
		}