function(series, s, r) {
            var me = this, w, h, x, y, i, cw, n = me.chart.dataSeries().length,
                sc = me.__scales, c = me.__canvas, bw, pad = 0.35, vspace = 0.1;

            if (me.get('orientation', 'vertical') == 'horizontal') {
                cw = c.h - c.bpad - c.tpad;
                bw = Math.min(24, cw / (n + (n-1) * pad));
                w = sc.y(series.data[r]) - sc.y(0);
                h = bw;
                if (w > 0) {
                    x = c.lpad + sc.y(0);
                } else {
                    x = c.lpad + sc.y(0) + w;
                    w *= -1;
                }
                y = Math.round(c.tpad + s * (bw + bw * pad));
            } else {
                cw = (c.w - c.lpad - c.rpad) * (1 - vspace - vspace);
                bw = cw / (n + (n-1) * pad);
                h = sc.y(series.data[r]) - sc.y(0);
                w = bw;
                if (h >= 0) {
                    y = c.h - c.bpad - sc.y(0) - h;
                } else {
                    y = c.h - c.bpad - sc.y(0);
                    h *= -1;
                }
                x = Math.round((c.w - c.lpad - c.rpad) * vspace + c.lpad + s * (bw + bw * pad));
            }
            return { w: w, h: h, x: x, y: y };
        }