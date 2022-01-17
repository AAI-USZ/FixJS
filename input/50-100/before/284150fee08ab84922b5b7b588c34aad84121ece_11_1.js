function(){
    if(pvc.debug >= 3){
      pvc.log("Prerendering in bulletChart");
    }
    
    this.bulletChartPanel = new pvc.BulletChartPanel(this, this.basePanel, {
        showValues:   this.options.showValues,
        showTooltips: this.options.showTooltips,
        orientation:  this.options.orientation
    });
  }