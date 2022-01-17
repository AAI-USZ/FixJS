function(
    declare,
    domGeom,
    win,
    _Chart,
    ChartManager,
    PiePlot
) {
    var chart = declare('Sage.Platform.Mobile.Charts.PieChart', [_Chart], {
        plotType: PiePlot,
        plotOptions: {
            labelStyle: 'columns',
            labelWiring: '#ccc',
            htmlLabels: true
        },
        legend: true,
        legendOptions: {
            horizontal: false
        },
        _onResize: function() {
            var radius = this.getRadius();
            if (this.chart && this.chart.stack)
                this.chart.stack[0].opt.radius = radius;

            this.inherited(arguments);
        },
        setSize: function() {
            var radius = this.getRadius();
            domGeom.setMarginBox(this.chartNode, {
                h: radius * 3,
                w: radius * 5
            });
        },
        getType: function() {
            var type = this.inherited(arguments);
            type['radius'] = this.getRadius();
            return type;
        },
        getRadius: function() {
            var box = win.getBox(),
                width = box.w,
                height = (box.h > this.maxHeight) ? this.maxHeight : box.h;

            return Math.floor((width > height ? height : width) / 5);
        },
        getAxes: function() {
            return [];
        }
    });

    ChartManager.register('pie', chart);

    return chart;
}