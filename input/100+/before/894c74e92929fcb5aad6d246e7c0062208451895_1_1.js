function (serie) {
				var seriesOptions = serie.options;

				run = false;


				// match this axis against the series' given or implicated axis
				each(['xAxis', 'yAxis'], function (strAxis) {
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

						if (strAxis === 'xAxis' && serie.options.padXAxis) {
							padAxis = true;
						}

						// the series is visible, run the min/max detection
						run = true;
					}
				});
				// ignore hidden series if opted
				if (!serie.visible && optionsChart.ignoreHiddenSeries) {
					run = false;
				}

				if (run) {

					var stacking,
						posPointStack,
						negPointStack,
						stackKey,
						negKey;

					if (!isXAxis) {
						stacking = seriesOptions.stacking;
						usePercentage = stacking === 'percent';

						// create a stack for this particular series type
						if (stacking) {
							stackKey = serie.type + pick(seriesOptions.stack, '');
							negKey = '-' + stackKey;
							serie.stackKey = stackKey; // used in translate

							posPointStack = posStack[stackKey] || []; // contains the total values for each x
							posStack[stackKey] = posPointStack;

							negPointStack = negStack[negKey] || [];
							negStack[negKey] = negPointStack;
						}
						if (usePercentage) {
							dataMin = 0;
							dataMax = 99;
						}
					}
					if (serie.isCartesian) { // line, column etc. need axes, pie doesn't

						var xData,
							yData,
							x,
							y,
							threshold = seriesOptions.threshold,
							yDataLength,
							activeYData = [],
							activeCounter = 0;

						if (isXAxis) {
							xData = serie.xData;
							dataMin = mathMin(pick(dataMin, xData[0]), mathMin.apply(math, xData));
							dataMax = mathMax(pick(dataMax, xData[0]), mathMax.apply(math, xData));
						} else {
							var isNegative,
								pointStack,
								key,
								j;

							// get clipped and grouped data
							serie.processData();

							var start = +new Date();

							xData = serie.processedXData;
							yData = serie.processedYData;
							yDataLength = yData.length;


							// loop over the non-null y values and read them into a local array
							for (i = 0; i < yDataLength; i++) {
								y = yData[i];
								if (y !== null && y !== UNDEFINED) {
									// read stacked values into a stack based on the x value,
									// the sign of y and the stack key
									if (stacking) {
										x = xData[i];
										isNegative = y < 0;
										pointStack = isNegative ? negPointStack : posPointStack;
										key = isNegative ? negKey : stackKey;

										y = pointStack[x] =
											defined(pointStack[x]) ?
											pointStack[x] + y : y;


										// add the series
										if (!stacks[key]) {
											stacks[key] = {};
										}

										// If the StackItem is there, just update the values,
										// if not, create one first
										if (!stacks[key][x]) {
											stacks[key][x] = new StackItem(options.stackLabels, isNegative, x);
										}
										stacks[key][x].setTotal(y);

									}

									j = y.length;
									if (j) { // array, like ohlc data
										while (j--) {
											if (y[j] !== null) {
												activeYData[activeCounter++] = y[j];
											}
										}
									} else {
										activeYData[activeCounter++] = y;
									}
								}
							}
							if (!usePercentage) { // percentage stacks are always 0-100
								dataMin = mathMin(pick(dataMin, activeYData[0]), mathMin.apply(math, activeYData));
								dataMax = mathMax(pick(dataMax, activeYData[0]), mathMax.apply(math, activeYData));
							}


							// todo: instead of checking useThreshold, just set the threshold to 0
							// in area and column-like chart types
							if (serie.useThreshold && threshold !== null) {
								if (dataMin >= threshold) {
									dataMin = threshold;
									ignoreMinPadding = true;
								} else if (dataMax < threshold) {
									dataMax = threshold;
									ignoreMaxPadding = true;
								}
							}


						}
					}
				}
			}