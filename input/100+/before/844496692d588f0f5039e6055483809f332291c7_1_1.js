function () {
		var series = this,
			processedXData = series.xData, // copied during slice operation below
			processedYData = series.yData,
			dataLength = processedXData.length,
			cropStart = 0,
			i, // loop variable
			cropThreshold = series.options.cropThreshold; // todo: consider combining it with turboThreshold


		// optionally filter out points outside the plot area
		if (!cropThreshold || dataLength > cropThreshold) {
			var extremes = series.xAxis.getExtremes(),
				min = extremes.min,
				max = extremes.max,
				cropEnd = dataLength - 1,
				point;

			// only crop if it's actually spilling out
			if (processedXData[0] < min || processedXData[cropEnd] > max) {

				// iterate up to find slice start
				for (i = 0; i < dataLength; i++) {
					if (processedXData[i] >= min) {
						cropStart = mathMax(0, i - 1);
						break;
					}
				}
				// proceed to find slice end
				for (i; i < dataLength; i++) {
					if (processedXData[i] > max) {
						cropEnd = i + 1;
						break;
					}
				}
				processedXData = processedXData.slice(cropStart, cropEnd);
				processedYData = processedYData.slice(cropStart, cropEnd);
			}
		}

		series.cropStart = cropStart;
		series.processedXData = processedXData;
		series.processedYData = processedYData;
	}