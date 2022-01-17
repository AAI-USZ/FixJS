function(el, o) {
      var i = 0;
      var seg;
      
      // Determine how to draw the shadow
      var shadow = parseShadow(o.shadow);
      shadow.string = '0 0 ' + shadow.radius + ' ' + shadow.color;

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.width>>1) + 'px'
        });
      }
      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        });
        if (o.shadow) ins(seg, css(fill(shadow.color, shadow.string), {top: shadow.top, left: shadow.left}));
        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
      }
      return el;
    }