function() {
    var style = this.container.style;
    style.MozTransform = GridManager.dirCtrl.translatePrev;
    this.setTranstionDuration(style, this.transitionDuration);
  }