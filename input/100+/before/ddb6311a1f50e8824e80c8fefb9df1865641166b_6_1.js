function(el, canvas) {
            var me = this;
            el.css({
                position: 'relative'
            });
            canvas = _.extend({
                w: el.width(),
                h: me.getMaxChartHeight(el),
                rpad: me.chart.dataSeries().length > 1 ? me.theme.rightPadding + me.theme.lineLabelWidth : me.theme.rightPadding,
                lpad: me.theme.leftPadding,
                bpad: me.theme.bottomPadding,
                tpad: 0
            }, canvas);
            canvas.root = el;
            canvas.paper = Raphael(el[0], canvas.w, canvas.h+2);
            el.height(canvas.h);
            $('.tooltip').hide();
            me.__canvas = canvas;
            return canvas;
        }