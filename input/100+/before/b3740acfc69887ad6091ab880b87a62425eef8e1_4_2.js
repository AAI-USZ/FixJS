function(target) {
      var self = this,
          el = self.el;

      if (target) {
        ins(target, css(el,
          left, ~~(target.offsetWidth/2) + px,
          top, ~~(target.offsetHeight/2) + px
        ), target[firstChild]);
      }
      self.on = 1;
      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var o = self.opts,
            i = 0,
            f = 20/o[speed],
            ostep = (1-o[opacity])/(f*o[trail] / 100),
            astep = f/o[lines];

        (function anim() {
          i++;
          for (var s=o[lines]; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o[opacity]);
            self[opacity](el, o[lines]-s, alpha, o);
          }
          if (self.on) setTimeout(anim, 50);
        })();
      }
      return self;
    }