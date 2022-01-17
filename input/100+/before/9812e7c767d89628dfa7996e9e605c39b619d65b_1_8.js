function(e) {
          if ($element.getStyle('display') !== 'none') {
            originalOpacity = $element.getStyle('opacity');
            options = Object.append({delay: 0, duration: 200, timingFunction: 'easeOut', onStart: null, onFinish: null}, options || {});
            this.addClip(Fx.morph($element, {opacity: 0}), options.delay, options.duration, options.timingFunction);
          } else {
            this.off('playstart.callback, playfinish.callback');
          }
        }