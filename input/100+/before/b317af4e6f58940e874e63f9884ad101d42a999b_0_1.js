function(args) {
			var hoverTimeLabel = hoverLegend.querySelector('.graph-time-label');
			hoverTimeLabel.innerHTML = args.formattedXValue;

			// for each metric
			args.detail.sort(function(a, b) { return a.order - b.order }).forEach(function(d) {
				var title = widgetMetricsConfig[d.name].title;
				var key = hoverLegend.querySelector('#metric-key-container-' + d.name);
				var label = key.querySelector('#metric-key-label-' + d.name);
				var valueLabel = key.querySelector('#metric-key-value-label-' + d.name);

				label.innerHTML = title + ": ";
				valueLabel.innerHTML = d.formattedYValue;

				var dot = document.createElement('div');
				dot.className = 'dot';
				dot.style.top = graph.object.y(d.value.y0 + d.value.y) + 'px';
				dot.style.borderColor = d.series.color;
				this.element.appendChild(dot);
				dot.className = 'dot active';

				this.show()
			}, this);
		}