function () {

				var baseExtremes = baseSeries.xAxis.getExtremes(),
					range = baseExtremes.max - baseExtremes.min,
					stickToMax = baseExtremes.max >=
						navigatorSeries.xData[navigatorSeries.xData.length - 1],
					stickToMin = baseExtremes.min - range <=
						navigatorSeries.xData[0],
						baseXAxis = baseSeries.xAxis,
						hasSetExtremes = !!baseXAxis.setExtremes,
					newMax,
					newMin;

				// set the navigator series data to the new data of the base series
				if (!navigatorData) {
					navigatorSeries.options.pointStart = baseSeries.xData[0];
					navigatorSeries.setData(baseSeries.options.data);
				}

				// if the selection is already at the max, move it to the right as new data
				// comes in
				if (stickToMax) {
					newMax = baseExtremes.dataMax;
					if (hasSetExtremes) {
						baseXAxis.setExtremes(newMax - range, newMax);
					}
				} else if (stickToMin) {
					newMin = baseExtremes.dataMin;
					if (hasSetExtremes) {
						baseXAxis.setExtremes(newMin, newMin + range);
					}
				// if not, just move the scroller window to reflect the new series data
				} else {
					render(
						mathMax(baseExtremes.min, baseExtremes.dataMin),
						mathMin(baseExtremes.max, baseExtremes.dataMax)
					);
				}
			}