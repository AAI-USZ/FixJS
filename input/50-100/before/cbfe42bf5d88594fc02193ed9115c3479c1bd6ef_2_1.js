function() {
    this.countryTitle.reset();
    for(var key in this.regions) {
      this.regions[key].element.setStyle('fill', jvm.WorldMap.defaultColor);
    }
    this.scale = this.baseScale;
    this.transX = this.baseTransX;
    this.transY = this.baseTransY;
    this.applyTransform();
  }