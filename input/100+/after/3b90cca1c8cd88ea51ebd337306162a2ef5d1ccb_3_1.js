function(
    declare,
    win,
    domGeom,
    _Chart,
    ChartManager,
    LinesPlot
) {
    return declare('Sage.Platform.Mobile.Charts.LineChart', [_Chart], {
        legend: true,
        xAxis: {
            minorTicks: false
        },
        yAxis: {
            vertical: true,
            minorTicks: false,
            fixLower: 'none',
            fixUpper: 'minor'
        },
        plotType: LinesPlot,
        plotOptions: {
            markers: false,
            tension: 'X'
        },
        getAxes: function() {
            var axes = this.inherited(arguments);

            if (this.feed)
                axes[0].options.maxLabelSize = Math.floor(domGeom.getMarginBox(this.chartNode).w / (this.feed.length + 3.5));

            return axes;
        },

        setSize: function() {
            this.inherited(arguments);

            if (this.chart && this.chart.axes['x'])
            {
                var axes = this.getAxes();
                this.chart.addAxis(axes[0].axis, axes[0].options);
            }
        }
    });
}