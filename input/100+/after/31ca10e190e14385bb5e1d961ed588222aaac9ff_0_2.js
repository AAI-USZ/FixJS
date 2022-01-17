function () {

		var o = $.extend(defaults, this.options),
			container = this.target.canvasContainer.addClass("visualize-hstack"),
			ctx = this.target.canvasContext,
			canvas = this.target.canvas,
			w = canvas.width(), h = canvas.height(),
			tableData = this.data,

			data = (o.parseDirection == 'x') ? tableData.lines : tableData.columns,
			dataSums = $.map(data, Array.sum),
			dataRange = (o.normalize ? 100 : Array.max(dataSums)),
			xLabels = $.visualize.getRangeLabels(0, dataRange, o.ticks),
			yLabels = (o.parseDirection == 'x') ? tableData.lineHeaders : tableData.columnHeaders;

		this.data.keys = (o.parseDirection == 'x') ?
			function() {return tableData.columnHeaders;} :
			function() {return tableData.lineHeaders;};

		// Display data range as X labels
		var xInterval = w / (xLabels.length - 1);
		var xlabelsUL = $("<ul>").addClass("visualize-labels-x")
			.width(w).height(h)
			.insertBefore(canvas);

		ctx.beginPath();
		ctx.lineWidth = 0.1;

		$.each(xLabels, function(i, label) {
			var $label = $("<span>").addClass("label").html(label);
			$("<li>")
				.css("left", xInterval * i)
				.width(xInterval)
				// .prepend("<span class='line' />")
				.append($label)
				.appendTo(xlabelsUL);

			$label.css((i == 0) ? {"text-align": "left"} : {"margin-left": -0.5 * $label.width()});

			ctx.moveTo(xInterval * (i + 1), 0);
			ctx.lineTo(xInterval * (i + 1), h);

		});

		ctx.strokeStyle = "#fff";
		ctx.stroke();
		ctx.closePath();

		// Display categories as Y labels
		var ylabelsUL = $("<ul>").addClass("visualize-labels-y")
			.width(w).height(h)
			.insertBefore(canvas);

		ctx.beginPath();
		ctx.lineWidth = 0.1;

		var liHeight = h / (yLabels.length);

		$.each(yLabels, function(i, label){
			var $label = $("<span>").addClass("label").html(label);
			$("<li>")
				.css("bottom", liHeight * i + liHeight / 2)
				//.prepend("<span class='line' />")
				.append($label)
				.prependTo(ylabelsUL);

			// Reposition the label by shifting it by half the height of its container
			$label.css('margin-top', $label.height() / -2);

			ctx.moveTo(0, h - liHeight * i);
			ctx.lineTo(w, h - liHeight * i);
		});

		ctx.strokeStyle = "#fff";
		ctx.stroke();
		ctx.closePath();

		// Iterate and draw the series of bars
		var xScale = w / dataRange;
		var yInterval = h / (yLabels.length);

		for (var i = 0; i < data.length; i++) {
			ctx.lineWidth  = yInterval - ((o.barMargin+o.barGroupMargin)*2);

			var serie = data[i], xPos = 0, yPos = h - yInterval*i - yInterval/2;
			var xFactor = o.normalize ? (100 / Array.sum(serie)) : 1;

			for (var j = 0; j < serie.length; j++) {
				var xVal = Math.round(serie[j]*xScale*xFactor);
				ctx.beginPath();
				ctx.strokeStyle = o.colors[j];
				ctx.moveTo(xPos, yPos);
				ctx.lineTo(xPos + xVal, yPos);
				ctx.stroke();
				ctx.closePath();

				xPos += xVal;
			}

		}
	}