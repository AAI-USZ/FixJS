function() {
	// for each metric, update legend values and color, as well as graph color
	var lastX = -1;
	var metrics = this.config.metrics;
	var metricName = null;
	for (metricName in metrics) {
		if (metrics.hasOwnProperty(metricName)) {
			var metric = metrics[metricName];
			var valueLabel = this.legend.querySelector(
				'#metric-key-value-label-' + metricName);
			var swatch = this.legend.querySelector(
				'#metric-key-swatch-' + metricName);
			var hoverSwatch = this.hoverLegend.querySelector(
				'#metric-key-swatch-' + metricName);
			var metricData = this.getMetricData(metricName);
			var lastCoord = metricData[metricData.length-1];
			var lastValue = yFormatter(lastCoord.y);
			if (lastCoord.x > lastX) {
				lastX = lastCoord.x;
			}
			valueLabel.innerHTML = lastValue;
			valueLabel.className = 'metric-key-value-label inactive';

			if (warningThresholdReached(metric.warning_min_threshold, 
				metric.warning_max_threshold, lastCoord.y)) {
				var warning_color = metric.warning_color;
				this.setMetricColor(metricName, warning_color);
				valueLabel.style.color = warning_color;
				swatch.style.backgroundColor = warning_color;
				hoverSwatch.style.backgroundColor = warning_color;
			} else {
				this.setMetricColor(metricName, metric.color);
				valueLabel.style.color = '';
				swatch.style.backgroundColor = metric.color;
				hoverSwatch.style.backgroundColor = metric.color;
			}
		}
	}

	this.timeLabel.innerHTML = xFormatter(lastX);
}