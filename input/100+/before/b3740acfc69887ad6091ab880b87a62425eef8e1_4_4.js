function() {
    var s = css(createEl(tag[0]), behavior, URL_VML),
        i;

    if (!vendor(s, transform) && s.adj) {
      // VML support detected. Insert CSS rules for group, shape and stroke.
      for (i=0; i < tag[length]; i++) {
        sheet.addRule(tag[i], behavior + ':' + URL_VML);
      }
      proto[lines] = function() {
        var o = this.opts,
            r = o[length]+o[width],
            s = 2*r;

        function grp() {
          return css(createEl(tag[0], coord+'size', s +' '+s, coord+Origin, -r + ' ' + -r), width, s, height, s);
        }

        var g = grp(),
            margin = ~(o[length]+o[radius]+o[width])+px,
            i;

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), 'rotation', 360 / o[lines] * i + 'deg', left, ~~dx),
              ins(css(createEl(tag[1], 'arcsize', 1), width, r, height, o[width], left, o[radius], top, -o[width]/2, 'filter', filter),
                createEl(tag[2], color, o[color], opacity, o[opacity]),
                createEl(tag[3], opacity, 0) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          );
        }

        if (o[shadow]) {
          for (i = 1; i <= o[lines]; i++) {
            seg(i, -2, 'progid:DXImage'+transform+'.Microsoft.Blur(pixel'+radius+'=2,make'+shadow+'=1,'+shadow+opacity+'=.3)');
          }
        }
        for (i = 1; i <= o[lines]; i++) {
          seg(i);
        }
        return ins(css(createEl(),
          'margin', margin + ' 0 0 ' + margin,
          position, relative
        ), g);
      };
      proto[opacity] = function(el, i, val, o) {
        o = o[shadow] && o[lines] || 0;
        el[firstChild][childNodes][i+o][firstChild][firstChild][opacity] = val;
      };
    }
    else {
      useCssAnimations = vendor(s, animation);
    }
  }