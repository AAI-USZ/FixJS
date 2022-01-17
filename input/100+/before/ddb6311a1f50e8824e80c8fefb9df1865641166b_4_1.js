function(el) {
            el = $(el);

            var me = this,
            c = me.initCanvas(el, {}),
            all_series = me.chart.dataSeries(),
            chart_width = c.w - c.lpad - c.rpad,
            series_gap = 0.05, // pull from theme
            row_gap = 0.01; // pull from theme

            me.init();
            me.initDimensions();

            $('.tooltip').hide();

            _.each(all_series, function(series, s) {
                _.each(series.data, function(val, r) {
                    var d = me.barDimensions(series, s, r);
                    me.registerSeriesElement(c.paper.rect(d.x, d.y, d.w, d.h).attr({
                        'stroke': 'none',
                        'fill': me.getSeriesColor(series, r)
                    }), series);
                });
            });
        }