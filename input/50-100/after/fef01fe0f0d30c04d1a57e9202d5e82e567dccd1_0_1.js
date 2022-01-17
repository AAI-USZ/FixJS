function() {
      var target = document.body;
      target.ontouchstart = null;
      target.ontouchmove = null;
      target.ontouchend = null;
      target.ontouchcancel = null;
      target.ongesturestart = null;
      target.ongesturechange = null;
      target.ongestureend = null;
      target.onorientationchange = null;
    }