function () {
		var series = this,
			chart = series.chart,
			options = series.options,
			stacking = options.stacking,
			borderWidth = options.borderWidth,
			columnCount = 0,
			xAxis = series.xAxis,
			reversedXAxis = xAxis.reversed,
			categories = xAxis.categories,
			stackGroups = {},
			stackKey,
			columnIndex;

		Series.prototype.translate.apply(series);

		// Get the total number of column type series.
		// This is called on every series. Consider moving this logic to a
		// chart.orderStacks() function and call it on init, addSeries and removeSeries
		each(chart.series, function (otherSeries) {
			if (otherSeries.type === series.type && otherSeries.visible &&
					series.options.group === otherSeries.options.group) { // used in Stock charts navigator series
				if (otherSeries.options.stacking) {
					stackKey = otherSeries.stackKey;
					if (stackGroups[stackKey] === UNDEFINED) {
						stackGroups[stackKey] = columnCount++;
					}
					columnIndex = stackGroups[stackKey];
				} else {
					columnIndex = columnCount++;
				}
				otherSeries.columnIndex = columnIndex;
			}
		});

		// calculate the width and position of each column based on
		// the number of column series in the plot, the groupPadding
		// and the pointPadding options
		var points = series.points,
			//closestPoints = series.closestPoints || 1,
			categoryWidth = mathAbs(pick(
				xAxis.leastDistance,
				chart.plotSizeX / ((categories && categories.length) || 1)
			)),
			groupPadding = categoryWidth * options.groupPadding,
			groupWidth = categoryWidth - 2 * groupPadding,
			pointOffsetWidth = groupWidth / columnCount,
			optionPointWidth = options.pointWidth,
			pointPadding = defined(optionPointWidth) ? (pointOffsetWidth - optionPointWidth) / 2 :
				pointOffsetWidth * options.pointPadding,
			pointWidth = mathCeil(mathMax(pick(optionPointWidth, pointOffsetWidth - 2 * pointPadding), 1)),
			colIndex = (reversedXAxis ? columnCount -
				series.columnIndex : series.columnIndex) || 0,
			pointXOffset = pointPadding + (groupPadding + colIndex *
				pointOffsetWidth - (categoryWidth / 2)) *
				(reversedXAxis ? -1 : 1),
			threshold = options.threshold,
			translatedThreshold = series.yAxis.getThreshold(threshold),
			minPointLength = pick(options.minPointLength, 5);

		// record the new values
		each(points, function (point, i) {
			var plotY = point.plotY,
				yBottom = point.yBottom || translatedThreshold,
				barX = point.plotX + pointXOffset,
				barY = mathCeil(mathMin(plotY, yBottom)),
				barH = mathCeil(mathMax(plotY, yBottom) - barY),
				stack = series.yAxis.stacks[(point.y < 0 ? '-' : '') + series.stackKey],
				trackerY,
				shapeArgs;

			// Record the offset'ed position and width of the bar to be able to align the stacking total correctly
			if (stacking && series.visible && stack && stack[point.x]) {
				stack[point.x].setOffset(pointXOffset, pointWidth);
			}

			// handle options.minPointLength and tracker for small points
			if (mathAbs(barH) < minPointLength) {
				if (minPointLength) {
					barH = minPointLength;
					barY =
						mathAbs(barY - translatedThreshold) > minPointLength ? // stacked
							yBottom - minPointLength : // keep position
							translatedThreshold - (plotY <= translatedThreshold ? minPointLength : 0);
				}
				trackerY = barY - 3;
			}

			extend(point, {
				barX: barX,
				barY: barY,
				barW: pointWidth,
				barH: barH
			});

			// create shape type and shape args that are reused in drawPoints and drawTracker
			point.shapeType = 'rect';
			shapeArgs = extend(chart.renderer.Element.prototype.crisp.apply({}, [
				borderWidth,
				barX,
				barY,
				pointWidth,
				barH
			]), {
				r: options.borderRadius
			});
			if (borderWidth % 2) { // correct for shorting in crisp method, visible in stacked columns with 1px border
				shapeArgs.y -= 1;
				shapeArgs.height += 1;
			}
			point.shapeArgs = shapeArgs;

			// make small columns responsive to mouse
			point.trackerArgs = defined(trackerY) && merge(point.shapeArgs, {
				height: mathMax(6, barH + 3),
				y: trackerY
			});
		});

	}