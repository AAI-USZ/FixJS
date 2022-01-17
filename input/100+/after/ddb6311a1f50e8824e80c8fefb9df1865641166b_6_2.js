function(x, y, txt, attrs) {
            var l, w, align, h;
            l = $('<div class="label'+(attrs.cl ? ' '+attrs.cl : '')+'"><span>'+txt+'</span></div>');
            w = attrs.w ? attrs.w : this.labelWidth(txt, attrs.cl);
            align = attrs.align ? attrs.align : 'left';
            x = align == 'left' ? x : align == 'center' ? x - w * 0.5 : x - w;
            l.css({
                position: 'absolute',
                left: x+'px',
                'text-align': align
            });
            if (attrs.w) {
                l.css({ width: w+'px' });
            }
            this.__canvas.root.append(l);
            h = attrs.h ? attrs.h : l.height();
            l.css({
                top: (y-h*0.5)+'px'
            });
            return l;
        }