f


		// Define variables

		var isXAxis = options.isX,

			opposite = options.opposite, // needed in setOptions

			horiz = inverted ? !isXAxis : isXAxis,

			side = horiz ?

				(opposite ? 0 : 2) : // top : bottom 

				(opposite ? 1 : 3),  // right : left

			stacks = {};





		options = merge(

				isXAxis ? defaultXAxisOptions : defaultYAxisOptions,

				[defaultTopAxisOptions, defaultRightAxisOptions,

					defaultBottomAxisOptions, defaultLeftAxisOptions][side],

				options

			);



		var axis = this,

			type = options.type,

			isDatetimeAxis = type === 'datetime',

			isLog = type === 'logarithmic',

			offset = options.offset || 0,

			xOrY = isXAxis ? 'x' : 'y',

			axisLength,

			transA, // translation factor

			transB, // translation addend

			oldTransA, // used for prerendering

			axisLeft,

			axisTop,

			axisWidth,

			axisHeight,

			axisBottom,

			axisRight,

			translate, // fn

			getPlotLinePath, // fn

			axisGroup,

			gridGroup,

			axisLine,

			dataMin,

			dataMax,

			associatedSeries,

			range = options.range,

			userMin,

			userMax,

			max = null,

			min = null,

			oldMin,

			oldMax,

			minPadding = options.minPadding,

			maxPadding = options.maxPadding,

			isLinked = defined(options.linkedTo),

			ignoreMinPadding, // can be set to true by a column or bar series

			ignoreMaxPadding,

			usePercentage,

			events = options.events,

			eventType,

			padAxis,

			plotLinesAndBands = [],

			tickInterval,

			minorTickInterval,

			magnitude,

			tickPositions, // array containing predefined positions

			ticks = {},

			minorTicks = {},

			alternateBands = {},

			tickAmount,

			labelOffset,

			labelHeight,

			axisTitleMargin,// = options.title.margin,

			dateTimeLabelFormat,

			categories = options.categories,

			labelFormatter = options.labels.formatter ||  // can be overwritten by dynamic format

				function () {

					var value = this.value,

						ret;



					if (dateTimeLabelFormat) { // datetime axis

						ret = dateFormat(dateTimeLabelFormat, value);



					} else if (tickInterval % 1000000 === 0) { // use M abbreviation

						ret = (value / 1000000) + 'M';



					} else if (tickInterval % 1000 === 0) { // use k abbreviation

						ret = (value / 1000) + 'k';



					} else if (!categories && value >= 1000) { // add thousands separators

						ret = numberFormat(value, 0);



					} else { // strings (categories) and small numbers

						ret = value;

					}

					return ret;

				},



			staggerLines = horiz && options.labels.staggerLines,

			reversed = options.reversed,

			tickmarkOffset = (categories && options.tickmarkPlacement === 'between') ? 0.5 : 0;



		/**

		 * The Tick class

		 */

		function Tick(pos, minor) {

			var tick = this;

			tick.pos = pos;

			tick.minor = minor;

			tick.isNew = true;



			if (!minor) {

				tick.addLabel();

			}

		}

		Tick.prototype = {

			attachLabel: function () {

				var label = this.label;

				if (label && !this.added) {

					label.deferUpdateTransform = true;

					label.add(axisGroup);

				}

			},

			updateTransformLabel: function () {

				var label = this.label;

				if (label) {

					label.deferUpdateTransform = false;

					label.updateTransform();

				}

			},

			computeBBox: function () {

				var label = this.label,

					bBox;

				if (label) {

					bBox = label.getBBox();

					label.elemWidth = bBox.width;

					label.elemHeight = bBox.height;

				}

			},

			/**

			 * Write the tick label

			 */

			addLabel: function () {

				var pos = this.pos,

					labelOptions = options.labels,

					str,

					withLabel = !((pos === min && !pick(options.showFirstLabel, 1)) ||

						(pos === max && !pick(options.showLastLabel, 0))),

					width = (categories && horiz && categories.length &&

						!labelOptions.step && !labelOptions.staggerLines &&

						!labelOptions.rotation &&

						plotWidth / categories.length) ||

						(!horiz && plotWidth / 2),

					css,

					label = this.label;





				// get the string

				str = labelFormatter.call({

						isFirst: pos === tickPositions[0],

						isLast: pos === tickPositions[tickPositions.length - 1],

						dateTimeLabelFormat: dateTimeLabelFormat,

						value: (categories && categories[pos] ? categories[pos] : pos)

					});





				// prepare CSS

				css = width && { width: mathMax(1, mathRound(width - 2 * (labelOptions.padding || 10))) + PX };

				css = extend(css, labelOptions.style);



				// first call

				if (!defined(label)) {

					this.label =

						defined(str) && withLabel && labelOptions.enabled ?

							renderer.text(

									str,

									0,

									0

								)

								.attr({

									align: labelOptions.align,

									rotation: labelOptions.rotation

								})

								// without position absolute, IE export sometimes is wrong

								.css(css) :

							null;



				// update

				} else if (label) {

					label.attr({ text: str })

						.css(css);

				}

			},

			/**

			 * Get the offset height or width of the label

			 */

			getLabelSize: function () {

				var label = this.label;

				return label ?

					((this.labelBBox = label.getBBox()))[horiz ? 'height' : 'width'] :

					0;

				},

			/**

			 * Put everything in place

			 *

			 * @param index {Number}

			 * @param old {Boolean} Use old coordinates to prepare an animation into new position

			 */

			render: function (index, old) {

				var tick = this,

					major = !tick.minor,

					label = tick.label,

					pos = tick.pos,

					labelOptions = options.labels,

					gridLine = tick.gridLine,

					gridLineWidth = major ? options.gridLineWidth : options.minorGridLineWidth,

					gridLineColor = major ? options.gridLineColor : options.minorGridLineColor,

					dashStyle = major ?

						options.gridLineDashStyle :

						options.minorGridLineDashStyle,

					gridLinePath,

					mark = tick.mark,

					markPath,

					tickLength = major ? options.tickLength : options.minorTickLength,

					tickWidth = major ? options.tickWidth : (options.minorTickWidth || 0),

					tickColor = major ? options.tickColor : options.minorTickColor,

					tickPosition = major ? options.tickPosition : options.minorTickPosition,

					step = labelOptions.step,

					cHeight = (old && oldChartHeight) || chartHeight,

					attribs,

					x,

					y;



				// get x and y position for ticks and labels

				x = horiz ?

					translate(pos + tickmarkOffset, null, null, old) + transB :

					axisLeft + offset + (opposite ? ((old && oldChartWidth) || chartWidth) - axisRight - axisLeft : 0);



				y = horiz ?

					cHeight - axisBottom + offset - (opposite ? axisHeight : 0) :

					cHeight - translate(pos + tickmarkOffset, null, null, old) - transB;



				// create the grid line

				if (gridLineWidth) {

					gridLinePath = getPlotLinePath(pos + tickmarkOffset, gridLineWidth, old);



					if (gridLine === UNDEFINED) {

						attribs = {

							stroke: gridLineColor,

							'stroke-width': gridLineWidth

						};

						if (dashStyle) {

							attribs.dashstyle = dashStyle;

						}

						tick.gridLine = gridLine =

							gridLineWidth ?

								renderer.path(gridLinePath)

									.attr(attribs).add(gridGroup) :

								null;

					}

					if (gridLine && gridLinePath) {

						gridLine.animate({

							d: gridLinePath

						});

					}

				}



				// create the tick mark

				if (tickWidth) {



					// negate the length

					if (tickPosition === 'inside') {

						tickLength = -tickLength;

					}

					if (opposite) {

						tickLength = -tickLength;

					}



					markPath = renderer.crispLine([

						M,

						x,

						y,

						L,

						x + (horiz ? 0 : -tickLength),

						y + (horiz ? tickLength : 0)

					], tickWidth);



					if (mark) { // updating

						mark.animate({

							d: markPath

						});

					} else { // first time

						tick.mark = renderer.path(

							markPath

						).attr({

							stroke: tickColor,

							'stroke-width': tickWidth

						}).add(axisGroup);

					}

				}



				// the label is created on init - now move it into place

				if (label && !isNaN(x)) {

					x = x + labelOptions.x - (tickmarkOffset && horiz ?

						tickmarkOffset * transA * (reversed ? -1 : 1) : 0);

					y = y + labelOptions.y - (tickmarkOffset && !horiz ?

						tickmarkOffset * transA * (reversed ? 1 : -1) : 0);



					// vertically centered

					if (!defined(labelOptions.y)) {

						y += pInt(label.styles.lineHeight) * 0.9 - label.getBBox().height / 2;

					}





					// correct for staggered labels

					if (staggerLines) {

						y += (index / (step || 1) % staggerLines) * 16;

					}

					// apply step

					if (step) {

						// show those indices dividable by step

						label[index % step ? 'hide' : 'show']();

					}



					label[tick.isNew ? 'attr' : 'animate']({

						x: x,

						y: y

					});

				}



				tick.isNew = false;

			},

			/**

			 * Destructor for the tick prototype

			 */

			destroy: function () {

				var tick = this,

					n;

				for (n in tick) {

					if (tick[n] && tick[n].destroy) {

						tick[n].destroy();

					}

				}

			}

		};



		/**

		 * The object wrapper for plot lines and plot bands

		 * @param {Object} options

		 */

		function PlotLineOrBand(options) {

			var plotLine = this;

			if (options) {

				plotLine.options = options;

				plotLine.id = options.id;

			}



			//plotLine.render()

			return plotLine;

		}



		PlotLineOrBand.prototype = {



		/**

		 * Render the plot line or plot band. If it is already existing,

		 * move it.

		 */

		render: function () {

			var plotLine = this,

				options = plotLine.options,

				optionsLabel = options.label,

				label = plotLine.label,

				width = options.width,

				to = options.to,

				toPath, // bands only

				from = options.from,

				dashStyle = options.dashStyle,

				svgElem = plotLine.svgElem,

				path = [],

				addEvent,

				eventType,

				xs,

				ys,

				x,

				y,

				color = options.color,

				zIndex = options.zIndex,

				events = options.events,

				attribs;



			// plot line

			if (width) {

				path = getPlotLinePath(options.value, width);

				attribs = {

					stroke: color,

					'stroke-width': width

				};

				if (dashStyle) {

					attribs.dashstyle = dashStyle;

				}

			} else if (defined(from) && defined(to)) { // plot band

				// keep within plot area

				from = mathMax(from, min);

				to = mathMin(to, max);



				toPath = getPlotLinePath(to);

				path = getPlotLinePath(from);

				if (path && toPath) {

					path.push(

						toPath[4],

						toPath[5],

						toPath[1],

						toPath[2]

					);

				} else { // outside the axis area

					path = null;

				}

				attribs = {

					fill: color

				};

			} else {

				return;

			}

			// zIndex

			if (defined(zIndex)) {

				attribs.zIndex = zIndex;

			}



			// common for lines and bands

			if (svgElem) {

				if (path) {

					svgElem.animate({

						d: path

					}, null, svgElem.onGetPath);

				} else {

					svgElem.hide();

					svgElem.onGetPath = function () {

						svgElem.show();

					};

				}

			} else if (path && path.length) {

				plotLine.svgElem = svgElem = renderer.path(path)

					.attr(attribs).add();



				// events

				if (events) {

					addEvent = function (eventType) {

						svgElem.on(eventType, function (e) {

							events[eventType].apply(plotLine, [e]);

						});

					};

					for (eventType in events) {

						addEvent(eventType);

					}

				}

			}



			// the plot band/line label

			if (optionsLabel && defined(optionsLabel.text) && path && path.length && axisWidth > 0 && axisHeight > 0) {

				// apply defaults

				optionsLabel = merge({

					align: horiz && toPath && 'center',

					x: horiz ? !toPath && 4 : 10,

					verticalAlign : !horiz && toPath && 'middle',

					y: horiz ? toPath ? 16 : 10 : toPath ? 6 : -4,

					rotation: horiz && !toPath && 90

				}, optionsLabel);



				// add the SVG element

				if (!label) {

					plotLine.label = label = renderer.text(

							optionsLabel.text,

							0,

							0

						)

						.attr({

							align: optionsLabel.textAlign || optionsLabel.align,

							rotation: optionsLabel.rotation,

							zIndex: zIndex

						})

						.css(optionsLabel.style)

						.add();

				}



				// get the bounding box and align the label

				xs = [path[1], path[4], pick(path[6], path[1])];

				ys = [path[2], path[5], pick(path[7], path[2])];

				x = mathMin.apply(math, xs);

				y = mathMin.apply(math, ys);



				label.align(optionsLabel, false, {

					x: x,

					y: y,

					width: mathMax.apply(math, xs) - x,

					height: mathMax.apply(math, ys) - y

				});

				label.show();



			} else if (label) { // move out of sight

				label.hide();

			}



			// chainable

			return plotLine;

		},



		/**

		 * Remove the plot line or band

		 */

		destroy: function () {

			var obj = this,

				n;



			for (n in obj) {

				if (obj[n] && obj[n].destroy) {

					obj[n].destroy(); // destroy SVG wrappers

				}

				delete obj[n];

			}

			// remove it from the lookup

			erase(plotLinesAndBands, obj);

		}

		};



		/**

		 * The class for stack items

		 */

		function StackItem(options, isNegative, x) {

			var stackItem = this;



			// Tells if the stack is negative

			stackItem.isNegative = isNegative;



			// Save the options to be able to style the label

			stackItem.options = options;



			// Save the x value to be able to position the label later

			stackItem.x = x;



			// The align options and text align varies on whether the stack is negative and

			// if the chart is inverted or not.

			// First test the user supplied value, then use the dynamic.

			stackItem.alignOptions = {

				align: options.align || (inverted ? (isNegative ? 'left' : 'right') : 'center'),

				verticalAlign: options.verticalAlign || (inverted ? 'middle' : (isNegative ? 'bottom' : 'top')),

				y: pick(options.y, inverted ? 4 : (isNegative ? 14 : -6)),

				x: pick(options.x, inverted ? (isNegative ? -6 : 6) : 0)

			};



			stackItem.textAlign = options.textAlign || (inverted ? (isNegative ? 'right' : 'left') : 'center');

		}



		StackItem.prototype = {

			/**

			 * Sets the total of this stack. Should be called when a serie is hidden or shown

			 * since that will affect the total of other stacks.

			 */

			setTotal: function (total) {

				this.total = total;

				this.cum = total;

			},



			/**

			 * Renders the stack total label and adds it to the stack label group.

			 */

			render: function (group) {

				var stackItem = this,									// aliased this

					str = stackItem.options.formatter.call(stackItem);  // format the text in the label



				// Change the text to reflect the new total and set visibility to hidden in case the serie is hidden

				if (stackItem.label) {

					stackItem.label.attr({text: str, visibility: HIDDEN});

				// Create new label

				} else {

					stackItem.label =

						chart.renderer.text(str, 0, 0)				// dummy positions, actual position updated with setOffset method in columnseries

							.css(stackItem.options.style)			// apply style

							.attr({align: stackItem.textAlign,			// fix the text-anchor

								rotation: stackItem.options.rotation,	// rotation

								visibility: HIDDEN })					// hidden until setOffset is called

							.add(group);							// add to the labels-group

				}

			},



			/**

			 * Sets the offset that the stack has from the x value and repositions the label.

			 */

			setOffset: function (xOffset, xWidth) {

				var stackItem = this,										// aliased this

					neg = stackItem.isNegative,								// special treatment is needed for negative stacks

					y = axis.translate(stackItem.total),					// stack value translated mapped to chart coordinates

					yZero = axis.translate(0),								// stack origin

					h = mathAbs(y - yZero),									// stack height

					x = chart.xAxis[0].translate(stackItem.x) + xOffset,	// stack x position

					plotHeight = chart.plotHeight,

					stackBox = {	// this is the box for the complete stack

							x: inverted ? (neg ? y : y - h) : x,

							y: inverted ? plotHeight - x - xWidth : (neg ? (plotHeight - y - h) : plotHeight - y),

							width: inverted ? h : xWidth,

							height: inverted ? xWidth : h

					};



				if (stackItem.label) {

					stackItem.label

						.align(stackItem.alignOptions, null, stackBox)	// align the label to the box

						.attr({visibility: VISIBLE});					// set visibility

				}

			}

		};



		/**

		 * Get the minimum and maximum for the series of each axis

		 */

		function getSeriesExtremes() {

			var posStack = [],

				negStack = [],

				i,

				run;



			// reset dataMin and dataMax in case we're redrawing

			dataMin = dataMax = null;



			// get an overview of what series are associated with this axis

			associatedSeries = [];

			each(series, function (serie) {

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

			});



		}



		/**

		 * Translate from axis value to pixel position on the chart, or back

		 *

		 */

		translate = function (val, backwards, cvsCoord, old, handleLog) {

			var sign = 1,

				cvsOffset = 0,

				localA = old ? oldTransA : transA,

				localMin = old ? oldMin : min,

				returnValue;



			if (!localA) {

				localA = transA;

			}



			if (cvsCoord) {

				sign *= -1; // canvas coordinates inverts the value

				cvsOffset = axisLength;

			}

			if (reversed) { // reversed axis

				sign *= -1;

				cvsOffset -= sign * axisLength;

			}



			if (backwards) { // reverse translation

				if (reversed) {

					val = axisLength - val;

				}

				returnValue = val / localA + localMin; // from chart pixel to value

				if (isLog && handleLog) {

					returnValue = lin2log(returnValue);

				}



			} else { // normal translation, from axis value to pixel, relative to plot

				if (isLog && handleLog) {

					val = log2lin(val);

				}

				returnValue = sign * (val - localMin) * localA + cvsOffset;

			}



			return returnValue;

		};



		/**

		 * Create the path for a plot line that goes from the given value on

		 * this axis, across the plot to the opposite side

		 * @param {Number} value

		 * @param {Number} lineWidth Used for calculation crisp line

		 * @param {Number] old Use old coordinates (for resizing and rescaling)

		 */

		getPlotLinePath = function (value, lineWidth, old) {

			var x1,

				y1,

				x2,

				y2,

				translatedValue = translate(value, null, null, old),

				cHeight = (old && oldChartHeight) || chartHeight,

				cWidth = (old && oldChartWidth) || chartWidth,

				skip;



			x1 = x2 = mathRound(translatedValue + transB);

			y1 = y2 = mathRound(cHeight - translatedValue - transB);



			if (isNaN(translatedValue)) { // no min or max

				skip = true;



			} else if (horiz) {

				y1 = axisTop;

				y2 = cHeight - axisBottom;

				if (x1 < axisLeft || x1 > axisLeft + axisWidth) {

					skip = true;

				}

			} else {

				x1 = axisLeft;

				x2 = cWidth - axisRight;



				if (y1 < axisTop || y1 > axisTop + axisHeight) {

					skip = true;

				}

			}

			return skip ?

				null :

				renderer.crispLine([M, x1, y1, L, x2, y2], lineWidth || 0);

		};



		/**

		 * Fix JS round off float errors

		 * @param {Number} num

		 */

		function correctFloat(num) {

			var invMag, ret = num;

			magnitude = pick(magnitude, math.pow(10, mathFloor(math.log(tickInterval) / math.LN10)));



			if (magnitude < 1) {

				invMag = mathRound(1 / magnitude)  * 10;

				ret = mathRound(num * invMag) / invMag;

			}

			return ret;

		}



		/**

		 * Set the tick positions of a linear axis to round values like whole tens or every five.

		 */

		function setLinearTickPositions() {



			var i,

				roundedMin = correctFloat(mathFloor(min / tickInterval) * tickInterval),

				roundedMax = correctFloat(mathCeil(max / tickInterval) * tickInterval);



			tickPositions = [];



			// populate the intermediate values

			i = correctFloat(roundedMin);

			while (i <= roundedMax) {

				tickPositions.push(i);

				i = correctFloat(i + tickInterval);

			}



		}



		/**

		 * Set the tick positions to round values and optionally extend the extremes

		 * to the nearest tick

		 */

		function setTickPositions(secondPass) {

			var length,

				catPad,

				linkedParent,

				linkedParentExtremes,

				tickIntervalOption = options.tickInterval,

				tickPixelIntervalOption = options.tickPixelInterval,

				maxZoom = options.maxZoom || (

					isXAxis && !defined(options.min) && !defined(options.max) ?

						mathMin(chart.smallestInterval * 5, dataMax - dataMin) :

						null

				),

				zoomOffset;



			axisLength = horiz ? axisWidth : axisHeight;



			// linked axis gets the extremes from the parent axis

			if (isLinked) {

				linkedParent = chart[isXAxis ? 'xAxis' : 'yAxis'][options.linkedTo];

				linkedParentExtremes = linkedParent.getExtremes();

				min = pick(linkedParentExtremes.min, linkedParentExtremes.dataMin);

				max = pick(linkedParentExtremes.max, linkedParentExtremes.dataMax);

			} else { // initial min and max from the extreme data values

				min = pick(userMin, options.min, dataMin);

				max = pick(userMax, options.max, dataMax);

			}



			if (isLog) {

				min = log2lin(min);

				max = log2lin(max);

			}



			// handle zoomed range

			if (range) {

				userMin = min = max - range;

				userMax = max;

				if (secondPass) {

					range = null;  // don't use it when running setExtremes

				}

			}



			// maxZoom exceeded, just center the selection

			if (max - min < maxZoom) {

				zoomOffset = (maxZoom - max + min) / 2;

				// if min and max options have been set, don't go beyond it

				min = mathMax(min - zoomOffset, pick(options.min, min - zoomOffset), dataMin);

				max = mathMin(min + maxZoom, pick(options.max, min + maxZoom), dataMax);

			}



			// pad the values to get clear of the chart's edges

			if (!categories && !usePercentage && !isLinked && defined(min) && defined(max)) {

				length = (max - min) || 1;

				if (!defined(options.min) && !defined(userMin) && minPadding && (dataMin < 0 || !ignoreMinPadding)) {

					min -= length * minPadding;

				}

				if (!defined(options.max) && !defined(userMax)  && maxPadding && (dataMax > 0 || !ignoreMaxPadding)) {

					max += length * maxPadding;

				}

			}



			// get tickInterval

			if (min === max || min === undefined || max === undefined) {

				tickInterval = 1;

			} else if (isLinked && !tickIntervalOption &&

					tickPixelIntervalOption === linkedParent.options.tickPixelInterval) {

				tickInterval = linkedParent.tickInterval;

			} else {

				tickInterval = pick(

					tickIntervalOption,

					categories ? // for categoried axis, 1 is default, for linear axis use tickPix

						1 :

						(max - min) * tickPixelIntervalOption / (axisLength || 1)

				);

			}



			if (!isDatetimeAxis) { // linear

				magnitude = math.pow(10, mathFloor(math.log(tickInterval) / math.LN10));

				if (!defined(options.tickInterval)) {

					tickInterval = normalizeTickInterval(tickInterval, null, magnitude, options);

				}

			}

			axis.tickInterval = tickInterval; // record for linked axis



			// get minorTickInterval

			minorTickInterval = options.minorTickInterval === 'auto' && tickInterval ?

					tickInterval / 5 : options.minorTickInterval;



			// find the tick positions

			if (isDatetimeAxis) {

				tickPositions = getTimeTicks(tickInterval, min, max, options.startOfWeek);

				dateTimeLabelFormat = options.dateTimeLabelFormats[tickPositions.unit[0]];

			} else {

				setLinearTickPositions();

			}



			if (!isLinked) {

				// pad categorised axis to nearest half unit

				if (categories || padAxis) {

					catPad = (categories ? 1 : tickInterval) * 0.5;

					if (categories || !defined(pick(options.min, userMin))) {

						min -= catPad;

					}

					if (categories || !defined(pick(options.max, userMax))) {

						max += catPad;

					}

				}



				// reset min/max or remove extremes based on start/end on tick

				var roundedMin = tickPositions[0],

					roundedMax = tickPositions[tickPositions.length - 1];



				if (options.startOnTick) {

					min = roundedMin;

				} else if (min > roundedMin) {

					tickPositions.shift();

				}



				if (options.endOnTick) {

					max = roundedMax;

				} else if (max < roundedMax) {

					tickPositions.pop();

				}



				// record the greatest number of ticks for multi axis

				if (!maxTicks) { // first call, or maxTicks have been reset after a zoom operation

					maxTicks = {

						x: 0,

						y: 0

					};

				}



				if (!isDatetimeAxis && tickPositions.length > maxTicks[xOrY] && options.alignTicks !== false) {

					maxTicks[xOrY] = tickPositions.length;

				}

			}





		}



		/**

		 * When using multiple axes, adjust the number of ticks to match the highest

		 * number of ticks in that group

		 */

		function adjustTickAmount() {



			if (maxTicks && !isDatetimeAxis && !categories && !isLinked && options.alignTicks !== false) { // only apply to linear scale

				var oldTickAmount = tickAmount,

					calculatedTickAmount = tickPositions.length;



				// set the axis-level tickAmount to use below

				tickAmount = maxTicks[xOrY];



				if (calculatedTickAmount < tickAmount) {

					while (tickPositions.length < tickAmount) {

						tickPositions.push(correctFloat(

							tickPositions[tickPositions.length - 1] + tickInterval

						));

					}

					transA *= (calculatedTickAmount - 1) / (tickAmount - 1);

					max = tickPositions[tickPositions.length - 1];



				}

				if (defined(oldTickAmount) && tickAmount !== oldTickAmount) {

					axis.isDirty = true;

				}

			}



		}



		/**

		 * Set the scale based on data min and max, user set min and max or options

		 *

		 */

		function setScale() {

			var type,

				i;



			oldMin = min;

			oldMax = max;



			// get data extremes if needed

			getSeriesExtremes();



			// get fixed positions based on tickInterval

			setTickPositions();



			// the translation factor used in translate function

			oldTransA = transA;

			transA = axisLength / ((max - min) || 1);



			// reset stacks

			if (!isXAxis) {

				for (type in stacks) {

					for (i in stacks[type]) {

						stacks[type][i].cum = stacks[type][i].total;

					}

				}

			}



			// mark as dirty if it is not already set to dirty and extremes have changed

			if (!axis.isDirty) {

				axis.isDirty = (min !== oldMin || max !== oldMax);

			}



		}



		/**

		 * Set the extremes and optionally redraw

		 * @param {Number} newMin

		 * @param {Number} newMax

		 * @param {Boolean} redraw

		 * @param {Boolean|Object} animation Whether to apply animation, and optionally animation

		 *    configuration

		 *

		 */

		function setExtremes(newMin, newMax, redraw, animation) {

			var start = +new Date();

			redraw = pick(redraw, true); // defaults to true



			fireEvent(axis, 'setExtremes', { // fire an event to enable syncing of multiple charts

				min: newMin,

				max: newMax

			}, function () { // the default event handler



				userMin = newMin;

				userMax = newMax;





				// redraw

				if (redraw) {

					chart.redraw(animation);

				}

			});

		}



		/**

		 * Update the axis metrics

		 */

		function setAxisSize() {



			var offsetLeft = options.offsetLeft || 0,

				offsetRight = options.offsetRight || 0;



			// basic values

			axisLeft = pick(options.left, plotLeft + offsetLeft);

			axisTop = pick(options.top, plotTop);

			axisWidth = pick(options.width, plotWidth - offsetLeft + offsetRight);

			axisHeight = pick(options.height, plotHeight);

			axisBottom = chartHeight - axisHeight - axisTop;

			axisRight = chartWidth - axisWidth - axisLeft;



			// expose to use in Series obejct

			axis.left = axisLeft;

			axis.top = axisTop;



			// secondary values

			axisLength = horiz ? axisWidth : axisHeight;

			transA = axisLength / ((max - min) || 1);

			transB = horiz ? axisLeft : axisBottom; // translation addend

		}



		/**

		 * Get the actual axis extremes

		 */

		function getExtremes() {

			return {

				min: min,

				max: max,

				dataMin: dataMin,

				dataMax: dataMax,

				userMin: userMin,

				userMax: userMax

			};

		}



		/**

		 * Get the zero plane either based on zero or on the min or max value.

		 * Used in bar and area plots

		 */

		function getThreshold(threshold) {

			if (min > threshold || threshold === null) {

				threshold = min;

			} else if (max < threshold) {

				threshold = max;

			}



			return translate(threshold, 0, 1);

		}



		/**

		 * Add a plot band or plot line after render time

		 *

		 * @param options {Object} The plotBand or plotLine configuration object

		 */

		function addPlotBandOrLine(options) {

			var obj = new PlotLineOrBand(options).render();

			plotLinesAndBands.push(obj);

			return obj;

		}



		/**

		 * Render the tick labels to a preliminary position to get their sizes

		 */

		function getOffset() {



			var hasData = associatedSeries.length && defined(min) && defined(max),

				titleOffset = 0,

				titleMargin = 0,

				axisTitleOptions = options.title,

				labelOptions = options.labels,

				directionFactor = [-1, 1, 1, -1][side],

				n;



			if (!axisGroup) {

				axisGroup = renderer.g('axis')

					.attr({ zIndex: 7 })

					.add();

				gridGroup = renderer.g('grid')

					.attr({ zIndex: 1 })

					.add();

			}



			labelOffset = 0; // reset



			if (hasData || isLinked) {

				each(tickPositions, function (pos) {

					if (!ticks[pos]) {

						ticks[pos] = new Tick(pos);

					} else {

						ticks[pos].addLabel(); // update labels depending on tick interval

					}



				});



				each(tickPositions, function (pos) {

					ticks[pos].attachLabel();

				});

				each(tickPositions, function (pos) {

					ticks[pos].computeBBox();

				});

				each(tickPositions, function (pos) {

					ticks[pos].updateTransformLabel();

				});



				each(tickPositions, function (pos) {

					// left side must be align: right and right side must have align: left for labels

					if (side === 0 || side === 2 || { 1: 'left', 3: 'right' }[side] === labelOptions.align) {



						// get the highest offset

						labelOffset = mathMax(

							ticks[pos].getLabelSize(),

							labelOffset

						);

					}



				});



				if (staggerLines) {

					labelOffset += (staggerLines - 1) * 16;

				}



			} else { // doesn't have data

				for (n in ticks) {

					ticks[n].destroy();

					delete ticks[n];

				}

			}



			if (axisTitleOptions && axisTitleOptions.text) {

				if (!axis.axisTitle) {

					axis.axisTitle = renderer.text(

						axisTitleOptions.text,

						0,

						0

					)

					.attr({

						zIndex: 7,

						rotation: axisTitleOptions.rotation || 0,

						align:

							axisTitleOptions.textAlign ||

							{ low: 'left', middle: 'center', high: 'right' }[axisTitleOptions.align]

					})

					.css(axisTitleOptions.style)

					.add();

				}



				titleOffset = axis.axisTitle.getBBox()[horiz ? 'height' : 'width'];

				titleMargin = pick(axisTitleOptions.margin, horiz ? 5 : 10);



			}



			// handle automatic or user set offset

			offset = directionFactor * pick(options.offset, axisOffset[side]);



			axisTitleMargin =

				labelOffset +

				(side !== 2 && labelOffset && directionFactor * options.labels[horiz ? 'y' : 'x']) +

				titleMargin;



			axisOffset[side] = mathMax(

				axisOffset[side],

				axisTitleMargin + titleOffset + directionFactor * offset

			);



		}



		/**

		 * Render the axis

		 */

		function render() {

			var axisTitleOptions = options.title,

				stackLabelOptions = options.stackLabels,

				alternateGridColor = options.alternateGridColor,

				lineWidth = options.lineWidth,

				lineLeft,

				lineTop,

				linePath,

				hasRendered = chart.hasRendered,

				slideInTicks = hasRendered && defined(oldMin) && !isNaN(oldMin),

				hasData = associatedSeries.length && defined(min) && defined(max);



			// If the series has data draw the ticks. Else only the line and title

			if (hasData || isLinked) {



				// minor ticks

				if (minorTickInterval && !categories) {

					var pos = min + (tickPositions[0] - min) % minorTickInterval;

					for (; pos <= max; pos += minorTickInterval) {

						if (!minorTicks[pos]) {

							minorTicks[pos] = new Tick(pos, true);

						}



						// render new ticks in old position

						if (slideInTicks && minorTicks[pos].isNew) {

							minorTicks[pos].render(null, true);

						}





						minorTicks[pos].isActive = true;

						minorTicks[pos].render();

					}

				}



				// major ticks

				each(tickPositions, function (pos, i) {

					// linked axes need an extra check to find out if

					if (!isLinked || (pos >= min && pos <= max)) {



						// render new ticks in old position

						if (slideInTicks && ticks[pos].isNew) {

							ticks[pos].render(i, true);

						}



						ticks[pos].isActive = true;

						ticks[pos].render(i);

					}

				});



				// alternate grid color

				if (alternateGridColor) {

					each(tickPositions, function (pos, i) {

						if (i % 2 === 0 && pos < max) {

							if (!alternateBands[pos]) {

								alternateBands[pos] = new PlotLineOrBand();

							}

							alternateBands[pos].options = {

								from: pos,

								to: tickPositions[i + 1] !== UNDEFINED ? tickPositions[i + 1] : max,

								color: alternateGridColor

							};

							alternateBands[pos].render();

							alternateBands[pos].isActive = true;

						}

					});

				}



				// custom plot lines and bands

				if (!hasRendered) { // only first time

					each((options.plotLines || []).concat(options.plotBands || []), function (plotLineOptions) {

						plotLinesAndBands.push(new PlotLineOrBand(plotLineOptions).render());

					});

				}







			} // end if hasData



			// remove inactive ticks

			each([ticks, minorTicks, alternateBands], function (coll) {

				var pos;

				for (pos in coll) {

					if (!coll[pos].isActive) {

						coll[pos].destroy();

						delete coll[pos];

					} else {

						coll[pos].isActive = false; // reset

					}

				}

			});









			// Static items. As the axis group is cleared on subsequent calls

			// to render, these items are added outside the group.

			// axis line

			if (lineWidth) {

				lineLeft = axisLeft + (opposite ? axisWidth : 0) + offset;

				lineTop = chartHeight - axisBottom - (opposite ? axisHeight : 0) + offset;



				linePath = renderer.crispLine([

						M,

						horiz ?

							axisLeft :

							lineLeft,

						horiz ?

							lineTop :

							axisTop,

						L,

						horiz ?

							chartWidth - axisRight :

							lineLeft,

						horiz ?

							lineTop :

							chartHeight - axisBottom

					], lineWidth);

				if (!axisLine) {

					axisLine = renderer.path(linePath)

						.attr({

							stroke: options.lineColor,

							'stroke-width': lineWidth,

							zIndex: 7

						})

						.add();

				} else {

					axisLine.animate({ d: linePath });

				}



			}



			if (axis.axisTitle) {

				// compute anchor points for each of the title align options

				var margin = horiz ? axisLeft : axisTop,

					fontSize = pInt(axisTitleOptions.style.fontSize || 12),

				// the position in the length direction of the axis

				alongAxis = {

					low: margin + (horiz ? 0 : axisLength),

					middle: margin + axisLength / 2,

					high: margin + (horiz ? axisLength : 0)

				}[axisTitleOptions.align],



				// the position in the perpendicular direction of the axis

				offAxis = (horiz ? axisTop + axisHeight : axisLeft) +

					(horiz ? 1 : -1) * // horizontal axis reverses the margin

					(opposite ? -1 : 1) * // so does opposite axes

					axisTitleMargin +

					(side === 2 ? fontSize : 0);



				axis.axisTitle[hasRendered ? 'animate' : 'attr']({

					x: horiz ?

						alongAxis :

						offAxis + (opposite ? axisWidth : 0) + offset +

							(axisTitleOptions.x || 0), // x

					y: horiz ?

						offAxis - (opposite ? axisHeight : 0) + offset :

						alongAxis + (axisTitleOptions.y || 0) // y

				});



			}



			// Stacked totals:

			if (stackLabelOptions && stackLabelOptions.enabled) {

				var stackKey, oneStack, stackCategory,

					stackTotalGroup = axis.stackTotalGroup;



				// Create a separate group for the stack total labels

				if (!stackTotalGroup) {

					axis.stackTotalGroup = stackTotalGroup =

						renderer.g('stack-labels')

							.attr({

								visibility: VISIBLE,

								zIndex: 6

							})

							.translate(plotLeft, plotTop)

							.add();

				}



				// Render each stack total

				for (stackKey in stacks) {

					oneStack = stacks[stackKey];

					for (stackCategory in oneStack) {

						oneStack[stackCategory].render(stackTotalGroup);

					}

				}

			}

			// End stacked totals



			axis.isDirty = false;

		}



		/**

		 * Remove a plot band or plot line from the chart by id

		 * @param {Object} id

		 */

		function removePlotBandOrLine(id) {

			var i = plotLinesAndBands.length;

			while (i--) {

				if (plotLinesAndBands[i].id === id) {

					plotLinesAndBands[i].destroy();

				}

			}

		}



		/**

		 * Redraw the axis to reflect changes in the data or axis extremes

		 */

		function redraw() {



			// hide tooltip and hover states

			if (tracker.resetTracker) {

				tracker.resetTracker();

			}



			// render the axis

			render();



			// move plot lines and bands

			each(plotLinesAndBands, function (plotLine) {

				plotLine.render();

			});



			// mark associated series as dirty and ready for redraw

			each(associatedSeries, function (series) {

				series.isDirty = true;

			});



		}



		/**

		 * Set new axis categories and optionally redraw

		 * @param {Array} newCategories

		 * @param {Boolean} doRedraw

		 */

		function setCategories(newCategories, doRedraw) {

				// set the categories

				axis.categories = categories = newCategories;



				// force reindexing tooltips

				each(associatedSeries, function (series) {

					series.translate();

					series.setTooltipPoints(true);

				});





				// optionally redraw

				axis.isDirty = true;



				if (pick(doRedraw, true)) {

					chart.redraw();

				}

		}







		// Run Axis



		// Register

		axes.push(axis);

		chart[isXAxis ? 'xAxis' : 'yAxis'].push(axis);



		// inverted charts have reversed xAxes as default

		if (inverted && isXAxis && reversed === UNDEFINED) {

			reversed = true;

		}





		// expose some variables

		extend(axis, {

			addPlotBand: addPlotBandOrLine,

			addPlotLine: addPlotBandOrLine,

			adjustTickAmount: adjustTickAmount,

			categories: categories,

			getExtremes: getExtremes,

			getPlotLinePath: getPlotLinePath,

			getThreshold: getThreshold,

			isXAxis: isXAxis,

			options: options,

			plotLinesAndBands: plotLinesAndBands,

			getOffset: getOffset,

			render: render,

			setAxisSize: setAxisSize,

			setCategories: setCategories,

			setExtremes: setExtremes,

			setScale: setScale,

			setTickPositions: setTickPositions,

			translate: translate,

			redraw: redraw,

			removePlotBand: removePlotBandOrLine,

			removePlotLine: removePlotBandOrLine,

			reversed: reversed,

			stacks: stacks

		});



		// register event listeners

		for (eventType in events) {

			addEvent(axis, eventType, events[eventType]);

		}



		// set min and max

		setScale();



	} // end Axis
