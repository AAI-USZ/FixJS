function anim() {
          i++;
          for (var s=o[lines]; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o[opacity]);
            self[opacity](el, o[lines]-s, alpha, o);
          }
          if (self.on) setTimeout(anim, 50);
        }