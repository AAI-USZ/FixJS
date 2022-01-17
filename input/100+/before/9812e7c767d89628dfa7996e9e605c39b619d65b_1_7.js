function(e) {
          if ($element.getStyle('display') === 'none') {
            var originalOpacity = $element.getStyle('opacity');
            options = Object.append({delay: 0, duration: 200, timingFunction: 'easeIn', onStart: null, onFinish: null}, options || {});
            this.addClip(Fx.morph($element, {opacity: originalOpacity}), options.delay, options.duration, options.timingFunction);
            $element.setStyles({'display': 'block', 'opacity': 0});
          } else {
            this.off('playstart.callback, playfinish.callback');
          }
        }