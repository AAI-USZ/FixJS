function() {
            //
            var me = this, c = me.__canvas,
                dMin = 0, dMax = 0;
            _.each(me.chart.dataSeries(), function(series) {
                dMin = Math.min(dMin, series._min());
                dMax = Math.max(dMax, series._max());
            });
            me.__scales = {
                data: d3.scale.linear().domain([dMin, dMax])
            };

            if (me.get('orientation') == 'horizontal') {
                me.__scales.data.rangeRound([c.lpad, c.w-c.rpad]);
            } else {
                me.__scales.data.rangeRound([c.tpad, c.h-c.bpad]);
            }
        }