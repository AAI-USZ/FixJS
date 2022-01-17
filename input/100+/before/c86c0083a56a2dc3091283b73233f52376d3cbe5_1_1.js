function(el) {
            el = $(el);

            this.setRoot(el);

            var me = this,
                sort = true,
                donut = me.isDonut(),
                showTotal = donut && me.get('show-total'),
                groupAfter = 5,

                c = me.initCanvas({}),
                chart_width = c.w - c.lpad - c.rpad,
                chart_height = c.h - c.bpad - c.tpad;

            c.cx = chart_width * 0.5;
            c.cy = chart_height * 0.5;
            c.or = Math.min(chart_height, chart_width) * 0.5 - 3;
            c.ir = donut ? c.or * 0.3 : 0;
            c.or_sq = c.or * c.or;
            c.ir_sq = c.ir * c.ir;

            row = 0;
            // 2d -> 1d
            if (!_.isUndefined(me.get('selected-row'))) {
                row = me.get('selected-row');
                if (row > me.chart.numRows() || row === undefined) row = 0;
            }
            me.chart.filterRow(row);

            me.init();

            $('.tooltip').hide();

            function arc(cx, cy, or, ir, startAngle, endAngle) {
                var x0 = cx+Math.cos(startAngle)*ir,
                    y0 = cy+Math.sin(startAngle)*ir,
                    x1 = cx+Math.cos(endAngle)*ir,
                    y1 = cy+Math.sin(endAngle)*ir,
                    x2 = cx+Math.cos(endAngle)*or,
                    y2 = cy+Math.sin(endAngle)*or,
                    x3 = cx+Math.cos(startAngle)*or,
                    y3 = cy+Math.sin(startAngle)*or;
                return me.path("M"+x0+" "+y0+" A"+ir+","+ir+" 0 0,1 "+x1+","+y1+" L"+x2+" "+y2+" A"+or+","+or+" 0 0,0 "+x3+" "+y3+" Z", 'slice');
            }

            var series = me.chart.dataSeries(true),
                total = 0, min = Number.MAX_VALUE, max = 0,
                reverse;

            _.each(series, function(s) {
                total += s.data[0];
                min = Math.min(min, s.data[0]);
                max = Math.max(max, s.data[0]);
            });
            reverse = min < total / series.length * 0.66 || max > total/series.length * 1.5;

            sa = -HALF_PI;
            if (reverse) sa += TWO_PI * (series[0].data[0] / total);

            me.__seriesAngles = {};

            function normalize(a0, a1) {
                a0 += HALF_PI;
                a1 += HALF_PI;
                if (a0 < 0) {
                    a0 += TWO_PI;
                    a1 += TWO_PI;
                }
                return [a0, a1];
            }

            _.each(series, function(s) {

                var da = s.data[0] / total * Math.PI * 2,
                    fill = me.getSeriesColor(s, 0),
                    stroke = d3.cie.lch(d3.rgb(fill)).darker(0.6).toString(),
                    a0 = reverse ? sa - da : sa,
                    a1 = reverse ? sa : sa + da,
                    lx = c.cx + Math.cos((a0 + a1) * 0.5) * c.or * 0.7,
                    ly = c.cy + Math.sin((a0 + a1) * 0.5) * c.or * 0.7,
                    value = showTotal ? Math.round(s.data[0] / total * 100)+'%' : me.chart.formatValue(s.data[0], true);

                me.registerSeriesElement(arc(c.cx, c.cy, c.or, c.ir, a0, a1).attr({
                    'stroke': stroke,
                    'fill': fill
                }), s);

                me.__seriesAngles[s.name] = normalize(a0, a1);

                sa += reverse ? -da : da;

                me.registerSeriesLabel(me.label(lx, ly, s.name+'<br />'+value, {
                    w: 50,
                    align: 'center',
                    valign: 'middle',
                    cl: me.chart.hasHighlight() && me.chart.isHighlighted(s) ? 'series highlighted inverse' : 'series'
                }), s);

            });

            if (showTotal) {
                me.label(c.cx, c.cy, '<strong>Total:</strong><br />'+me.chart.formatValue(total, true), {
                    w: 50,
                    align: 'center',
                    valign: 'middle'
                });
            }

            // enable mouse events
            el.mousemove(_.bind(me.onMouseMove, me));
        }