function(el) {
            el = $(el);

            this.setRoot(el);

            var me = this,
            isVertical = me.get('orientation') == 'vertical',
            c = me.initCanvas({}),
            chart_width = c.w - c.lpad - c.rpad,
            series_gap = 0.05, // pull from theme
            row_gap = 0.01; // pull from theme

            if (me.get('selected-row') !== null) {
                me.chart.filterRow(me.get('selected-row'));
            }

            me.init();
            me.initDimensions();

            $('.tooltip').hide();

            if (isVertical) me.horzGrid();

            _.each(me.chart.dataSeries(), function(series, s) {
                _.each(series.data, function(val, r) {
                    var d = me.barDimensions(series, s, r);
                    me.registerSeriesElement(c.paper.rect(d.x, d.y, d.w, d.h).attr({
                        'stroke': 'none',
                        'fill': me.getSeriesColor(series, r)
                    }), series);

                    if (isVertical) {
                        var val_y = val > 0 ? d.y - 10 : d.y + d.h + 10,
                            lbl_y = val <= 0 ? d.y - 10 : d.y + d.h + 5;
                        if (me.chart.isHighlighted(series)) {
                            // add value labels
                            me.registerSeriesLabel(me.label(d.x + d.w * 0.5, val_y, me.chart.formatValue(series.data[r]),{
                                w: d.w,
                                align: 'center',
                                cl: 'value'
                            }), series);
                        }

                        // add series label
                        me.registerSeriesLabel(me.label(d.x + d.w * 0.5, lbl_y, series.name, {
                            w: d.w,
                            align: 'center',
                            valign: val > 0 ? 'top' : 'bottom',
                            cl: me.chart.isHighlighted(series) ? 'series highlighted' : 'series'
                        }), series);

                    } else {
                        var val_x = val > 0 ? d.x + d.w + 10 : d.x- 5,
                            lbl_x = val <= 0 ? d.x + d.w + 5 : d.x- 10;
                        me.registerSeriesLabel(me.label(val_x, d.y + d.h * 0.5, me.chart.formatValue(series.data[r]),{
                            w: 40,
                            align: val > 0 ? 'left' : 'right',
                            cl: 'value'
                        }), series);

                        // add series label
                        me.registerSeriesLabel(me.label(lbl_x, d.y + d.h * 0.5, series.name,{
                            w: 80,
                            align: val <= 0 ? 'left' : 'right',
                            cl: me.chart.isHighlighted(series) ? 'series highlighted' : 'series'
                        }), series);
                    }

                });
            });

            if (isVertical) {
                var y = c.h - me.__scales.y(0) - c.bpad;
                me.path([['M', c.lpad, y], ['L', c.w - c.rpad, y]], 'axis')
                    .attr(me.theme.yAxis);
            } else if (me.__domain[0] < 0) {
                var x = c.lpad + me.__scales.y(0);
                me.path([['M', x, c.tpad], ['L', x, c.h - c.bpad]], 'axis')
                    .attr(me.theme.yAxis);
            }

            // enable mouse events
            el.mousemove(_.bind(me.onMouseMove, me));
        }