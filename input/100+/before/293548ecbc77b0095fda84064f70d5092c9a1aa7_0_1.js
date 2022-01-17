function (elem, prop, duration, timing, delay) {
    var tProps = Monocle.Browser.css.toDOMProps('transition');
    var pProps = Monocle.Browser.css.toCSSProps(prop);
    timing = timing || "linear";
    delay = (delay || 0)+"ms";
    for (var i = 0, ii = tProps.length; i < ii; ++i) {
      var t = "none";
      if (duration) {
        t = [pProps[i], duration+"ms", timing, delay].join(" ");
      }
      elem.style[tProps[i]] = t;
    }
  }