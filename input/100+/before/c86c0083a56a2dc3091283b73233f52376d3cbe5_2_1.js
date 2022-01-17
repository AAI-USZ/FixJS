function(canvas) {
            var me = this, el = me.__root, w = $(document).width();
            canvas = _.extend({
                w: w,
                h: me.getMaxChartHeight(el),
                rpad: me.theme.padding.right,
                lpad: me.theme.padding.left,
                bpad: me.theme.padding.bottom,
                tpad: me.theme.padding.top
            }, canvas);
            canvas.root = el;
            canvas.paper = Raphael(el[0], canvas.w, canvas.h+2);
            //console.log(w, w-canvas.lpad-canvas.rpad);
            //canvas.paper.rect(canvas.lpad, canvas.tpad, canvas.w - canvas.lpad - canvas.rpad, canvas.h - canvas.tpad - canvas.bpad);
            el.height(canvas.h);
            $('.tooltip').hide();
            me.__canvas = canvas;
            return canvas;
        }