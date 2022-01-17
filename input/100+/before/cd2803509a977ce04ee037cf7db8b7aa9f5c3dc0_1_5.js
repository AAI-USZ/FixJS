function () {
		if (!this.processedXData) { // hidden series
			this.processData();
		}
		this.generatePoints();
		var series = this,
			chart = series.chart,
			options = series.options,
			stacking = options.stacking,
			xAxis = series.xAxis,
			categories = xAxis.categories,
			yAxis = series.yAxis,
			points = series.points,
			//data = series.data,
			//dataLength = data.length,
			//point,
			//xData = series.processedXData || series.xData,
			//yData = series.processedYData || series.yData,
			dataLength = points.length,
			//closestPoints,
			//smallestInterval,
			leastDistance = xAxis.leastDistance,
			interval,
			i,
			cropI = -1;


		for (i = 0; i < dataLength; i++) {
			var point = points[i],
				xValue = point.x,
				yValue = point.y,
				yBottom = point.low,
				stack = yAxis.stacks[(yValue < 0 ? '-' : '') + series.stackKey],
				pointStack,
				distance,
				pointStackTotal;
			// get the plotX translation
			point.plotX = series.xAxis.translate(xValue);

			// calculate the bottom y value for stacked series
			if (stacking && series.visible && stack && stack[xValue]) {
				pointStack = stack[xValue];
				pointStackTotal = pointStack.total;
				pointStack.cum = yBottom = pointStack.cum - yValue; // start from top
				yValue = yBottom + yValue;

				if (stacking === 'percent') {
					yBottom = pointStackTotal ? yBottom * 100 / pointStackTotal : 0;
					yValue = pointStackTotal ? yValue * 100 / pointStackTotal : 0;
				}

				point.percentage = pointStackTotal ? point.y * 100 / pointStackTotal : 0;
				point.stackTotal = pointStackTotal;
			}

			if (defined(yBottom)) {
				point.yBottom = yAxis.translate(yBottom, 0, 1, 0, 1);
			}

			// set the y value
			if (yValue !== null) {
				point.plotY = yAxis.translate(yValue, 0, 1, 0, 1);
			}

			// set client related positions for mouse tracking
			point.clientX = chart.inverted ?
				chart.plotHeight - point.plotX :
				point.plotX; // for mouse tracking

			// some API data
			point.category = categories && categories[point.x] !== UNDEFINED ?
				categories[point.x] : point.x;

			// get the smallest distance between points for columns
			if (series.getDistance && i) {
				distance = mathAbs(point.plotX - points[i - 1].plotX);
				leastDistance = leastDistance === UNDEFINED ? distance : mathMin(distance, leastDistance);
			}

		}

		xAxis.leastDistance = leastDistance;

		// now that we have the cropped data, build the segments
		series.getSegments();
	}