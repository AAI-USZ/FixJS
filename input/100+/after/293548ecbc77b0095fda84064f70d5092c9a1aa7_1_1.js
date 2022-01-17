function setX(elem, x, options, callback) {
    var duration, transition;

    if (!options.duration) {
      duration = 0;
    } else {
      duration = parseInt(options.duration);
    }

    if (Monocle.Browser.env.supportsTransition) {
      Monocle.Styles.transitionFor(
        elem,
        'transform',
        duration,
        options.timing,
        options.delay
      );

      if (Monocle.Browser.env.supportsTransform3d) {
        Monocle.Styles.affix(elem, 'transform', 'translate3d('+x+'px,0,0)');
      } else {
        Monocle.Styles.affix(elem, 'transform', 'translateX('+x+'px)');
      }

      if (typeof callback == "function") {
        if (duration && Monocle.Styles.getX(elem) != x) {
          Monocle.Events.afterTransition(elem, callback);
        } else {
          Monocle.defer(callback);
        }
      }
    } else {
      // Old-school JS animation.
      elem.currX = elem.currX || 0;
      var completeTransition = function () {
        elem.currX = x;
        Monocle.Styles.setX(elem, x);
        if (typeof callback == "function") { callback(); }
      }
      if (!duration) {
        completeTransition();
      } else {
        var stamp = (new Date()).getTime();
        var frameRate = 40;
        var step = (x - elem.currX) * (frameRate / duration);
        var stepFn = function () {
          var destX = elem.currX + step;
          var timeElapsed = ((new Date()).getTime() - stamp) >= duration;
          var pastDest = (destX > x && elem.currX < x) ||
            (destX < x && elem.currX > x);
          if (timeElapsed || pastDest) {
            completeTransition();
          } else {
            Monocle.Styles.setX(elem, destX);
            elem.currX = destX;
            setTimeout(stepFn, frameRate);
          }
        }
        stepFn();
      }
    }
  }