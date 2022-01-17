function(series, s, r) {
            var me = this, w, h, x, y, i, sc = me.__scales, c = me.__canvas, bw = 30;
            if (me.get('orientation') == 'horizontal') {
                bw = (c.h - c.bpad - c.tpad) / me.chart.dataSeries().length / 1.5;
                w = sc.data(series.data[r]);
                h = bw;
                x = c.lpad;
                y = Math.round(s*bw*1.5 + r * h*1.35);
            } else {
                bw = (c.w - c.lpad - c.rpad) / me.chart.dataSeries().length / series.data.length/1.5;
                h = sc.data(series.data[r]);
                w = bw;
                y = c.h - c.bpad - h;
                x = c.lpad + s*bw*1.5*series.data.length + r * w * 1.35;
            }
            return { w: w, h: h, x: x, y: y };
        }