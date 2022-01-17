function pg_moveToEnd() {
    var style = this.container.style;
    style.MozTransform = GridManager.dirCtrl.translateNext;
    this.setTranstionDuration(style, this.transitionDuration);
  }