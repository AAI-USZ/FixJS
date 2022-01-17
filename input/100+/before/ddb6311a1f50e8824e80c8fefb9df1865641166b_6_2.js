function(x, y, txt, attrs) {
            var l, w, align, h;
            l = $('<div class="label'+(attrs.cl ? ' '+attrs.cl : '')+'"><span>'+txt+'</span></div>');
            w = attrs.w ? attrs.w : 80;
            align = attrs.align ? attrs.align : 'left';
            x = align == 'left' ? x : align == 'center' ? x - w * 0.5 : x - w;
            l.css({
                position: 'absolute',
                left: x+'px',
                width: w+'px',
                'text-align': align
            });
            this.__canvas.root.append(l);
            h = attrs.h ? attrs.h : l.height();
            l.css({
                top: (y-h*0.5)+'px'
            });
            return l;
        }