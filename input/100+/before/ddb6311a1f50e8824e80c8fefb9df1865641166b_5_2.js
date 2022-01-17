function(el) {
            el = $(el);
            var
            me = this,
            ds = me.dataset,
            scales = me.__scales = {
                x: me.xScale(),
                y: me.yScale()
            },

            c;

            me.init();

            c = me.initCanvas(el, {
                h: me.get('force-banking') ?
                    el.width() / me.computeAspectRatio() : me.getMaxChartHeight(el)
            });

            scales.x = scales.x.range([c.lpad, c.w-c.rpad]);
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
                sw = me.theme.lineWidth[me.chart.isHighlighted(col) ? 'focus' : 'context'];

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

                if (me.chart.dataSeries().length > 1 && me.chart.dataSeries().length < 10) {
                    var lbl = me.label(x+15, y, col.name, { cl: me.chart.isHighlighted(col) ? 'highlighted series' : 'series' });
                    lbl.data('highlighted', me.chart.isHighlighted(col));
                    me.registerSeriesLabel(lbl, col);
                }
            });

            me.orderSeriesElements();

            if (me.theme.lineHoverDotRadius) {
                this.hoverDot = c.paper.circle(0, 0, me.theme.lineHoverDotRadius).hide();
            }

            if (true || me.theme.tooltips) {
                el.mousemove(_.bind(me.onMouseMove, me));
            }

            window.ds = me.dataset;
            window.vis = me;
        }