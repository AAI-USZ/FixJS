function (data, redraw) {
		var series = this,
			oldData = series.points,
			options = series.options,
			initialColor = series.initialColor,
			chart = series.chart,
			i;

		series.xIncrement = null; // reset for new data
		if (defined(initialColor)) { // reset colors for pie
			chart.counters.color = initialColor;
		}

		// parallel arrays
		var xData = [],
			yData = [],
			dataLength = data.length,
			turboThreshold = options.turboThreshold || 1000,
			pt;

		// In turbo mode, only one- or twodimensional arrays of numbers are allowed. The
		// first value is tested, and we assume that all the rest are defined the same
		// way. Although the 'for' loops are similar, they are repeated inside each
		// if-else conditional for max performance.
		if (dataLength > turboThreshold) {
			if (isNumber(data[0])) { // assume all points are numbers
				var x = pick(options.pointStart, 0),
					pointInterval = pick(options.pointInterval, 1);

				for (i = 0; i < dataLength; i++) {
					xData[i] = x;
					yData[i] = data[i];
					x += pointInterval;
				}
				series.xIncrement = x;
			} else if (data[0].constructor === Array) { // assume all points are arrays
				if (series.valueCount === 4) { // [x, o, h, l, c]
					for (i = 0; i < dataLength; i++) {
						pt = data[i];
						xData[i] = pt[0];
						yData[i] = pt.slice(1, 5);
					}
				} else { // [x, y]
					for (i = 0; i < dataLength; i++) {
						pt = data[i];
						xData[i] = pt[0];
						yData[i] = pt[1];
					}
				}
			}
		} else {
			for (i = 0; i < dataLength; i++) {
				pt = { series: series };
				series.pointClass.prototype.applyOptions.apply(pt, [data[i]]);
				xData[i] = pt.x;
				yData[i] = pt.y;
			}
		}

		series.data = null;
		series.options.data = data;
		series.xData = xData;
		series.yData = yData;


		// destroy old points
		i = (oldData && oldData.length) || 0;
		while (i--) {
			oldData[i].destroy();
		}

		// redraw
		series.isDirty = series.isDirtyData = chart.isDirtyBox = true;
		if (pick(redraw, true)) {
			chart.redraw(false);
		}
	}