function (strAxis) {
					if (
						// the series is a cartesian type, and...
						serie.isCartesian &&
						// we're in the right x or y dimension, and...
						((strAxis === 'xAxis' && isXAxis) || (strAxis === 'yAxis' && !isXAxis)) && (
							// the axis number is given in the options and matches this axis index, or
							(seriesOptions[strAxis] === options.index) ||
							// the axis index is not given
							(seriesOptions[strAxis] === UNDEFINED && options.index === 0)
						)
					) {
						serie[strAxis] = axis;
						associatedSeries.push(serie);

						if (serie.options.padXAxis) {
							padAxis = true;
						}

						// the series is visible, run the min/max detection
						run = true;
					}
				}