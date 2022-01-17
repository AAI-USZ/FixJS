function(contentOptions){
    if(pvc.debug >= 3){
      pvc.log("Prerendering in bulletChart");
    }
    
    this.bulletChartPanel = new pvc.BulletChartPanel(this, this.basePanel, def.create(contentOptions, {
        showValues:   this.options.showValues,
        showTooltips: this.options.showTooltips,
        orientation:  this.options.orientation
    }));
  }