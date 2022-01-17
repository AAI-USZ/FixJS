function define() {
    $.visualize.plugins.hbar = function () {

        var o = this.options,
            container = this.target.canvasContainer.addClass("visualize-hbar"),
            ctx = this.target.canvasContext,
            canvas = this.target.canvas,
            w = canvas.width(), h = canvas.height(),
            tabledata = this.data,

            data = (o.parseDirection == 'x') ? tabledata.lines : tabledata.columns,
            dataMax = data.map(Array.max),
            dataRange = Array.max(dataMax),

				    xLabels = $.visualize.getRangeLabels(0, dataRange, 5),
				    yLabels = (o.parseDirection == 'x') ? tabledata.columnHeaders : tabledata.lineHeaders;

        // Display data range as X labels
        var xlabelsUL = $("<ul>").addClass("visualize-labels-x")
            .width(w).height(h)
            .insertBefore(canvas);

        ctx.beginPath();
        ctx.lineWidth = 0.1;

        var xInterval = w / (xLabels.length - 1);

        $.each(xLabels, function(i, label) {

            var $label = $("<span>").addClass("label").html(label);
            $("<li>")
                .css('left', xInterval * i)
                .width(xInterval)
                .append($label)
                .appendTo(xlabelsUL);

            if (i > 0) {
                $label.css("margin-left", -0.5 * $label.width());
            }

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

        $.each(yLabels, function(i, label) {
            var $label = $("<span>").addClass("label").html(label);
            $("<li>")
                .css({"top": liHeight*i + liHeight/2, "height": liHeight/2})
                .append($label)
                .appendTo(ylabelsUL);

            // Slitghly reposition the label to center it on the median line
            $label.css('margin-top', -0.5 * $label.height());

            ctx.moveTo(0, liHeight * (i + 1));
            ctx.lineTo(w, liHeight * (i + 1));
        });

        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.closePath();

        // iterate on the series and draw the bars
        var xScale = w / dataRange;
        var yBandHeight = h / (yLabels.length);

        for (var i = 0; i < data.length; i++) {
            ctx.beginPath();
            var linewidth = (yBandHeight - o.barGroupMargin*2) / data.length; // a single bar width (with margins)
            ctx.lineWidth = linewidth - (o.barMargin * 2);
            var serie = data[i];

            for (var j = 0; j < serie.length; j++) {
                var yPos = j*yBandHeight + o.barGroupMargin + i*linewidth + linewidth/2;
                ctx.moveTo(0, yPos);
                ctx.lineTo(Math.round(serie[j] * xScale) + 0.1, yPos);
            }
            ctx.strokeStyle = o.colors[i];
            ctx.stroke();
            ctx.closePath();
        }
    }
}