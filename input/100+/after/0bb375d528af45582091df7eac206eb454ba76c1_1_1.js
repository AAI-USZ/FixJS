function (progress) {
  if (this.progress != progress) {
    var start;
    var end;
    var style;
    
    if (this.startValues.style === undefined) {
      style = {easing:'linear'};
    } else{
      style = this.startValues.style;
    }
    
    if (this.startValues.progress.indexOf('%') >= 0) {
      start = parseInt(this.startValues.progress,10) / 100;
    } else if (JarallaxTools.hasNumbers(this.startValues.progress)) {
      start = parseInt(this.startValues.progress,10) / this.jarallax.maxProgress;
    }
    
    if (this.endValues.progress.indexOf('%') >= 0)
    {
      end = parseInt(this.endValues.progress,10) / 100;
    } else if (JarallaxTools.hasNumbers(this.endValues.progress)) {
      end = parseInt(this.endValues.progress,10) / this.jarallax.maxProgress;
    }
    
    if (this.startValues.event) {
      this.dispatchEvent(this.progress, progress, start, end);
    }
    
    if (progress >= start && progress <= end ) {
      for(var i in this.startValues) {
        if (i !== 'progress' && i !== 'style' && i !== 'event') {
          if (undefined !== this.endValues[i] && i !== 'display' && i !== 'backgroundImage') {
            var units = JarallaxTools.getUnits(this.startValues[i]+'');
            units = units.replace('-','');
            var startValue = parseFloat(this.startValues[i]);
            var endValue = parseFloat(this.endValues[i]);
            
            var duration = end - start;
            var currentTime = (progress-start);
            var changeInValue = endValue - startValue ;
            var result =  Jarallax.EASING[style.easing](currentTime, 
                startValue , changeInValue, duration, style.power);
            
            if(units == 'px'){
              result = parseInt(result, 10);
            }
            
            if(units !== '.'){
              result+= units;
            }
            $(this.selector).css(i,result);
          } else {
            $(this.selector).css(i,this.startValues[i]);
          }
        }
      }
    }
    this.progress = progress;
  }
}