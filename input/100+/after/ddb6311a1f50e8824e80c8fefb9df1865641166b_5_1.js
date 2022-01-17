function(col) {
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
            }