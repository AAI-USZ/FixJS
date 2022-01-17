function(r) {
            //
            var me = this, c = me.__canvas,
                dMin = 0, dMax = 0;
            _.each(me.chart.dataSeries(), function(series) {
                dMin = Math.min(dMin, series._min());
                dMax = Math.max(dMax, series._max());
            });
            me.__domain = [dMin, dMax];
            me.__scales = {
                y: d3.scale.linear().domain([dMin, dMax])
            };

            if (me.get('orientation', 'vertical') == 'horizontal') {
                me.__scales.y.rangeRound([c.lpad, c.w-c.rpad-c.lpad-30]);
            } else {
                me.__scales.y.rangeRound([0, c.h - c.bpad - c.tpad]);
            }
        }