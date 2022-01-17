function pg_moveTo(translate) {
    var style = this.container.style;
    style.MozTransform = 'translateX(-moz-calc(' + translate + '))';
    this.setTranstionDuration(style, 0);
  }