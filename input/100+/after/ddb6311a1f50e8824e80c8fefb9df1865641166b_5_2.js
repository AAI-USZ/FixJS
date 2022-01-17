function(el) {
            el = $(el);
            var
            me = this;
            me.setRoot(el);

            var
            ds = me.dataset,
            scales = me.__scales = {
                x: me.xScale(),
                y: me.yScale()
            },
            h = me.get('force-banking') ? el.width() / me.computeAspectRatio() : me.getMaxChartHeight(el),
            c;

            me.init();

            c = me.initCanvas({
                h: h
            });

            if (me.lineLabelsVisible()) {
                c.labelWidth = 0;
                _.each(me.chart.dataSeries(), function(col) {
                    console.log(col.name, me.labelWidth(col.name));
                    c.labelWidth = Math.max(c.labelWidth, me.labelWidth(col.name, 'series')+10);
                });
                if (c.labelWidth > me.theme.lineChart.maxLabelWidth) {
                    c.labelWidth = me.theme.lineChart.maxLabelWidth;
                }
                c.rpad += c.labelWidth;
                console.log(c.labelWidth);
            }

            scales.x = scales.x.range([c.lpad+me.yAxisWidth(h)+20, c.w-c.rpad]);
            scales.y = scales.y.range([c.h-c.bpad, 5]);

            me.yAxis();

            me.xAxis();

            var seriesLines = this.__seriesLines = {};

            // draw series lines
            _.each(me.chart.dataSeries(), function(col) {
                var path = [], x, y, sw;
                _.each(col.data, function(val, i) {
                    x = scales.x(i);
                    y = scales.y(val);
                    path.push([path.length> 0 ? 'L' : 'M', x, y]);
                });
                sw = me.theme.lineChart.strokeWidth[me.chart.isHighlighted(col) ? 'highlight' : 'normal'];

                me.registerSeriesElement(c.paper.path(path).attr({
                    'stroke-width': sw,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-opacity': 1,
                    'stroke': me.getSeriesColor(col)
                }), col);

                // add invisible line on top to make selection easier
                me.registerSeriesElement(c.paper.path(path).attr({
                    'stroke-width': sw*4,
                    'stroke-opacity': 0
                }), col);

                if (me.lineLabelsVisible()) {
                    var lbl = me.label(x+10, y, col.name,
                        { cl: me.chart.isHighlighted(col) ? 'highlighted series' : 'series',
                          w: c.labelWidth });
                    lbl.data('highlighted', me.chart.isHighlighted(col));
                    me.registerSeriesLabel(lbl, col);
                } // */
            });

            me.orderSeriesElements();

            if (me.theme.lineChart.hoverDotRadius) {
                this.hoverDot = c.paper.circle(0, 0, me.theme.lineChart.hoverDotRadius).hide();
            }

            if (true || me.theme.tooltips) {
                el.mousemove(_.bind(me.onMouseMove, me));
            }

            window.ds = me.dataset;
            window.vis = me;
        }