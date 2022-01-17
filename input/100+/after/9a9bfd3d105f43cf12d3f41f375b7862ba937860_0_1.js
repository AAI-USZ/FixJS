function (prop, duration, easing, callback) {
    if (tire.isFun(duration)) callback = duration;
    if (tire.isFun(easing)) callback = easing;
  
    easing = easing || 'linear';
    duration = tire.isNum(duration) ? duration : durations[duration] || durations.normal;
    
    var self = this
      , filter = tire('div').css('filter') === ''
      , start = (+new Date())
      , end = start + duration
      , currentTime = start
      , position
      , interval
      , p
      , eas;
    
    for (p in prop) {
      if (prop.hasOwnProperty(p)) {
        if (!tire.isObj(prop[p])) prop[p] = { value: prop[p], current: 0 };
        if ((this.css(p) !== '' && this.css(p) !== 'auto') && !prop[p].current) prop[p].current = this.css(p);
      }
    }
            
    var loop = function (time) {
      position = time > end ? 1 : (time - start) / duration;
      eas = easings[easing](duration * position, 0, 1, duration);
      for (var p in prop) {
        v = transform(eas, prop[p]);
        self.css(p, (p === 'opacity' ? parseFloat(v) : v));
        if (p === 'opacity' && !filter) {
          self.css('filter', 'alpha(opacity=' + (numericalTransform(parseFloat(prop[p].current), parseFloat(prop[p].value), eas)*100) + ')');
        }
      }
      if (time > end) cancelAnimationFrame(interval);
      else requestAnimationFrame(loop);
    }
      
    interval = requestAnimationFrame(loop);
  }