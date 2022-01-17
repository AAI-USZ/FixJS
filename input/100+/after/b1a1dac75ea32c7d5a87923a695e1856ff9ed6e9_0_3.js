function () {

			var $table = $(this);

			//configuration
			var o = $.extend({
				type:'bar', //also available: area, pie, line
				width:$table.width(), //height of canvas - defaults to table height
				height:$table.height(), //height of canvas - defaults to table height
				appendTitle:true, //table caption text is added to chart
				title:null, //grabs from table caption if null
				appendKey:true, //color key is added to chart
				rowFilter:' ',
				colFilter:' ',
				colors:['#be1e2d', '#666699', '#92d5ea', '#ee8310', '#8d10ee', '#5a3b16', '#26a4ed', '#f45a90', '#e9e744'],
				bgcolors:["#777", "#aaa", "#eee"],
				textColors:[], //corresponds with colors array. null/undefined items will fall back to CSS
				parseDirection:'x', //which direction to parse the table data

				pieMargin:20, //pie charts only - spacing around pie
				pieLabelsAsPercent:true,
				pieLabelPos:'inside',

				lineWeight:4, //for line and area - stroke weight
				barGroupMargin:10,
				barMargin:1, //space around bars in bar chart (added to both sides of bar)

				yLabelInterval:30 //distance between y labels
			}, options);

			//reset width, height to numbers
			var w = o.width  = parseFloat(o.width);
			var h = o.height = parseFloat(o.height);

			o.ticks = +o.ticks || Math.ceil(h / o.yLabelInterval);

			// Build-in Chart functions
			var charts = {
				pie:function () {
					$canvasContainer.addClass('visualize-pie');
					if (o.pieLabelPos == 'outside') {
						$canvasContainer.addClass('visualize-pie-outside');
					}
					var centerX = Math.round(w / 2);
					var centerY = Math.round(h / 2);
					var radius = centerY - o.pieMargin;
					var counter = 0.0;
					var labels = $('<ul class="visualize-labels"></ul>')
						.insertAfter($canvas);

					$.each(memberTotals, function (i, total) {
						// Draw the pie pieces
						var slice = (total <= 0 || isNaN(total)) ? 0 : total / dataSum;
						if (slice > 0) {
							ctx.beginPath();
							ctx.moveTo(centerX, centerY);
							ctx.arc(centerX, centerY, radius,
								counter * Math.PI * 2 - Math.PI * 0.5,
								(counter + slice) * Math.PI * 2 - Math.PI * 0.5,
								false);
							ctx.lineTo(centerX, centerY);
							ctx.closePath();
							ctx.fillStyle = dataGroups[i].color;
							ctx.fill();
						}

						// Draw labels
						var sliceMiddle = (counter + slice / 2);
						var distance = o.pieLabelPos == 'inside' ? radius / 1.5 : radius + radius / 5;
						var labelX = Math.round(centerX + Math.sin(sliceMiddle * Math.PI * 2) * (distance));
						var labelY = Math.round(centerY - Math.cos(sliceMiddle * Math.PI * 2) * (distance));
						var leftRight = (labelX > centerX) ? 'right' : 'left';
						var topBottom = (labelY > centerY) ? 'bottom' : 'top';
						var percentage = parseFloat((slice * 100).toFixed(2));

						if (percentage) {
							var labelval = (o.pieLabelsAsPercent) ? percentage + '%' : total;
							var labeltext = $('<span class="visualize-label">' + labelval + '</span>')
								.css(leftRight, 0)
								.css(topBottom, 0);
							var label = $('<li class="visualize-label-pos"></li>')
								.appendTo(labels)
								.css({left:labelX, top:labelY})
								.append(labeltext);
							labeltext
								.css('font-size', radius / 8)
								.css('margin-' + leftRight, -labeltext.width() / 2)
								.css('margin-' + topBottom, -labeltext.outerHeight() / 2);
							if (dataGroups[i].textColor) {
								labeltext.css('color', dataGroups[i].textColor);
							}
						}
						counter += slice;
					});
				},

				line:function (area) {
					$canvasContainer.addClass((area) ? 'visualize-area' : 'visualize-line');

					//write X labels
					var xInterval = $canvas.width() / (xLabels.length - 1);
					var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
						.width(w).height(h)
						.insertBefore($canvas);
					$.each(xLabels, function (i) {
						var thisLi = $('<li><span>' + this + '</span></li>')
							.prepend('<span class="line" />')
							.css('left', xInterval * i)
							.appendTo(xlabelsUL);
						var label = thisLi.find('span:not(.line)');
						var leftOffset = label.width() / -2;
						if (i == 0) {
							leftOffset = 0;
						}
						else if (i == xLabels.length - 1) {
							leftOffset = -label.width();
						}
						label
							.css('margin-left', leftOffset)
							.addClass('label');
					});
					//write Y labels
					var yScale = h / totalYRange;
					var liBottom = h / (yLabels.length - 1);
					var ylabelsUL = $('<ul class="visualize-labels-y"></ul>')
						.width(w).height(h)
						.insertBefore($canvas);
					$.each(yLabels, function (i) {
						var thisLi = $('<li><span>' + this + '</span></li>')
							.prepend('<span class="line" />')
							.css('bottom', liBottom * i)
							.prependTo(ylabelsUL);
						var label = thisLi.find('span:not(.line)');
						var topOffset = label.height() / -2;
						if (i == 0) {
							topOffset = -label.height();
						}else if (i == yLabels.length - 1) {
							topOffset = 0;
						}
						label
							.css('margin-top', topOffset)
							.addClass('label');
					});
					//start from the bottom left
					ctx.translate(0, zeroLoc);
					//iterate and draw
					$.each(dataGroups, function () {
						ctx.beginPath();
						ctx.lineWidth = o.lineWeight;
						ctx.lineJoin = 'round';
						var points = this.points;
						var integer = 0;
						ctx.moveTo(0, -(points[0] * yScale));
						$.each(points, function () {
							ctx.lineTo(integer, -(this * yScale));
							integer += xInterval;
						});
						ctx.strokeStyle = this.color;
						ctx.stroke();
						if (area) {
							ctx.lineTo(integer, 0);
							ctx.lineTo(0, 0);
							ctx.closePath();
							ctx.fillStyle = this.color;
							ctx.globalAlpha = .3;
							ctx.fill();
							ctx.globalAlpha = 1.0;
						}
						else {
							ctx.closePath();
						}
					});
				},

				area:function () {
          			charts.line(true);
				}
			};

			//create new canvas, set w&h attrs (not inline styles)
			var $canvas = $("<canvas>").attr("height", h).attr("width", w);
			//get title for chart
			var title = o.title || $table.find('caption').text();

			//create canvas wrapper div, set inline w&h, append
			var $canvasContainer = (container || $("<div>"))
				.addClass("visualize")
				.attr("role", "img").attr("aria-label", "Chart representing data from the table: " + title)
				.height(h).width(w)
				.append($canvas);

			//scrape table (this should be cleaned up into an obj)
			var tableData = new TableData($table, o).parse();
			var dataGroups = tableData.dataGroups();
			var dataSum = tableData.dataSum();
			var topValue = tableData.topValue();
			var bottomValue = tableData.bottomValue();
			var memberTotals = tableData.memberTotals();
			var totalYRange = tableData.totalYRange();
			var zeroLoc = h * (topValue / totalYRange);
			var xLabels = tableData.xLabels();
			var yLabels = tableData.yLabels(bottomValue, topValue);


			//append new canvas to page
			if (!container) {
				$canvasContainer.insertAfter($table);
			}
			if (typeof(G_vmlCanvasManager) != 'undefined') {
				G_vmlCanvasManager.init();
				G_vmlCanvasManager.initElement($canvas[0]);
			}

			//set up the drawing board
			var ctx = $canvas[0].getContext('2d');

			//create chart
			drawChart(charts, o.type, {
				target:{
					canvasContainer:$canvasContainer,
					canvasContext:ctx,
					canvas:$canvas
				},
				data:tableData,
				options:o
			});


      //title/key container
      if (o.appendTitle || o.appendKey) {
        var $infoContainer = $("<div>").addClass("visualize-info").appendTo($canvasContainer);

        //append title
        if (o.appendTitle) {
          $("<div>").addClass("visualize-title").html(title).appendTo($infoContainer);
        }

        //append color keys of the series
        if (o.appendKey) {
          var $keys = $("<ul>").addClass("visualize-key");
          $.each(tableData.keys(), function(i, key) {
            $("<li>")
              .append($("<span>").addClass("visualize-key-color").css("background", o.colors[i]))
              .append($("<span>").addClass("visualize-key-label").html(key))
              .appendTo($keys)
          });
          $keys.appendTo($infoContainer);
        }
      }

			//clean up some doubled lines that sit on top of canvas borders (done via JS due to IE)
			$('.visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line').css('border', 'none');

			if (!container) {
				//add event for updating
				$canvasContainer.bind('visualizeRefresh', function () {
					$table.visualize(o, $(this).empty());
				});
			}
		}