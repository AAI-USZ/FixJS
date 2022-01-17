function() {
            // draw tick marks and labels
            var yscale = this.__scales.y,
                me = this,
                c = this.__canvas,
                domain = this.__domain,
                styles = this.__styles,
                ticks = yscale.ticks(c.h / 50),
                bt = yscale(ticks[0]),
                tt = yscale(ticks[ticks.length-1]);

            if (Math.abs(yscale(domain[0]) - bt) < 30) ticks.shift();
            if (Math.abs(tt - yscale(domain[1])) < 30) ticks.pop();

            ticks.unshift(domain[0]);
            ticks.push(domain[1]);

            _.each(ticks, function(val, t) {
                var y = yscale(val), x = c.lpad-me.theme.yLabelOffset;
                if (val >= domain[0] && val <= domain[1]) {
                    // c.paper.text(x, y, val).attr(styles.labels).attr({ 'text-anchor': 'end' });
                    me.label(x, y, me.chart.formatValue(val, t == ticks.length-1), { align: 'right', w: 60, cl: 'axis' });
                    if (me.theme.yTicks) {
                        me.path([['M', c.lpad-25, y], ['L', c.lpad-20,y]], 'tick');
                    }
                    if (me.theme.horizontalGrid) {
                        me.path([['M', c.lpad, y], ['L', c.w - c.rpad,y]], 'grid')
                            .attr(me.theme.horizontalGrid);
                    }
                }
            });
            // draw axis line

            if (me.theme.yAxis) {
                this.path([
                    ['M', c.lpad-20, yscale(domain[0])],
                    ['L', c.lpad-20, yscale(domain[1])]
                ], 'axis').attr(me.theme.yAxis);
            }
        }