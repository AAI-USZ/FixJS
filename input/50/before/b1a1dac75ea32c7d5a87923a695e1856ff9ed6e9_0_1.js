function (start, end) {
			var numLabels = this.options.ticks || Math.round(this.options.height / this.options.yLabelInterval);
			return $.visualize.getRangeLabels(start, end, numLabels);
		}