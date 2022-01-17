function() {
            // draw x scale labels
            var me = this, ds = me.dataset, c = me.__canvas;
            if (me.chart.hasRowHeader()) {
                var last_label_x = -100, min_label_distance = 50;
                _.each(me.chart.rowLabels(), function(val, i) {
                    var x = me.__scales.x(i), y = c.h-c.bpad+me.theme.xLabelOffset;
                    if (x - last_label_x < min_label_distance) return;
                    last_label_x = x;
                    me.label(x, y, val, { align: 'center', cl: 'axis' });
                });
            }
        }