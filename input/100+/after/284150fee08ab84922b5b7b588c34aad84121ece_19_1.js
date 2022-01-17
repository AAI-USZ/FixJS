function(contentOptions){

    if(pvc.debug >= 3){
      pvc.log("Prerendering in parallelCoordinates");
    }

    this.parCoordPanel = new pvc.ParCoordPanel(this, this.basePanel, def.create(contentOptions, {
      topRuleOffset : this.options.topRuleOffset,
      botRuleOffset : this.options.botRuleOffset,
      leftRuleOffset : this.options.leftRuleOffset,
      rightRuleOffset : this.options.rightRuleOffset,
      sortCategorical : this.options.sortCategorical,
      mapAllDimensions : this.options.mapAllDimensions,
      numDigits : this.options.numDigits
    }));
  }