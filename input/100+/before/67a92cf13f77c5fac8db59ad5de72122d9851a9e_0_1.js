function(args) {
		var graphElement = this.element.querySelector('.graph');
		this.legend = this.element.querySelector('.legend');
		this.timeLabel = this.legend.querySelector('.graph-time-label');
		this.hoverLegend = this.element.querySelector('.hover-legend');
		this.hoverTimeLabel = this.hoverLegend.querySelector('.graph-time-label');


		// disable the warning color switch when a graph is clicked on
		graphElement.onclick = $.proxy(this.warningSwitch.disable, this.warningSwitch);

		// build metrics
		var metricName = null;
		var series = [];
		for (metricName in this.config.metrics) {
			if (this.config.metrics.hasOwnProperty(metricName)) {
				var mConfig = this.config.metrics[metricName];

				metric = new Metric({
					name: metricName,
					mConfig: mConfig,
					graphWidget: this
				});

				this.metrics[metricName] = metric;
				series.push(metric.getGraphAttrs());
			}
		}

		this.object = new Rickshaw.Graph({
			element: graphElement,
			renderer: 'line',
			series: series
		});

		var xAxis = new Rickshaw.Graph.Axis.Time({
			graph: this.object 
		});

		var yAxis = new Rickshaw.Graph.Axis.Y({
			element: this.element.querySelector('.y-axis'),
			orientation: 'left',
			graph: this.object,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
		});

		var hover = new Hover({
			graphObject: this.object, 
			mConfigs: this.config.metrics, 
			legend: this.legend,
			hoverLegend: this.hoverLegend, 
			hoverTimeLabel: this.hoverTimeLabel
		});

		this.object.render();
	}