function () {
		var point = this,
			series = point.series,
			prop;

		series.chart.pointCount--;

		if (point === series.chart.hoverPoint) {
			point.onMouseOut();
		}
		series.chart.hoverPoints = null; // remove reference

		// remove all events
		if (point.graphic || point.dataLabel) { // removeEvent and destroyElements are performance expensive
			removeEvent(point);
			point.destroyElements();
		}

		if (point.legendItem) { // pies have legend items
			point.series.chart.legend.destroyItem(point);
		}

		for (prop in point) {
			point[prop] = null;
		}


	}