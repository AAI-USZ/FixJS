function clickButton(i, rangeOptions, redraw) {

		var baseAxis = chart.xAxis[0],
			extremes = baseAxis && baseAxis.getExtremes(),
			now,
			dataMin = extremes && extremes.dataMin,
			dataMax = extremes && extremes.dataMax,
			newMin,
			newMax = baseAxis && mathMin(extremes.max, dataMax),
			date = new Date(newMax),
			type = rangeOptions.type,
			count = rangeOptions.count,
			baseXAxisOptions,
			range,
			rangeMin,
			year,
			// these time intervals have a fixed number of milliseconds, as opposed
			// to month, ytd and year
			fixedTimes = {
				millisecond: 1,
				second: 1000,
				minute: 60 * 1000,
				hour: 3600 * 1000,
				day: 24 * 3600 * 1000,
				week: 7 * 24 * 3600 * 1000
			};

		// chart has no data, base series is removed
		if (dataMin === null || dataMax === null) {
			return;
		}

		if (fixedTimes[type]) {
			range = fixedTimes[type] * count;
			newMin = mathMax(newMax - range, dataMin);
		} else if (type === 'month') {
			date.setMonth(date.getMonth() - count);
			newMin = mathMax(date.getTime(), dataMin);
			range = 30 * 24 * 3600 * 1000 * count;
		} else if (type === 'ytd') {
			date = new Date(0);
			now = new Date();
			year = now.getFullYear();
			date.setFullYear(year);

			// workaround for IE6 bug, which sets year to next year instead of current
			if (String(year) !== dateFormat('%Y', date)) {
				date.setFullYear(year - 1);
			}

			newMin = rangeMin = mathMax(dataMin || 0, date.getTime());
			now = now.getTime();
			newMax = mathMin(dataMax || now, now);
		} else if (type === 'year') {
			date.setFullYear(date.getFullYear() - count);
			newMin = mathMax(dataMin, date.getTime());
			range = 365 * 24 * 3600 * 1000 * count;
		} else if (type === 'all' && baseAxis) {
			newMin = dataMin;
			newMax = dataMax;
		}

		// mark the button pressed
		if (buttons[i]) {
			buttons[i].setState(2);
		}

		// update the chart
		if (!baseAxis) { // axis not yet instanciated
			baseXAxisOptions = chart.options.xAxis;
			baseXAxisOptions[0] = merge(
				baseXAxisOptions[0],
				{
					range: range,
					min: rangeMin
				}
			);
			selected = i;

		} else { // existing axis object; after render time
			setTimeout(function () { // make sure the visual state is set before the heavy process begins
				baseAxis.setExtremes(
					newMin,
					newMax,
					pick(redraw, 1),
					0
				);
				selected = i;
			}, 1);
		}

	}