function pg_moveToCenter(onTransitionEnd) {
    var cont = this.container;
    var style = cont.style;
    style.MozTransform = 'translateX(0)';
    this.setTranstionDuration(style, this.transitionDuration);
    if (onTransitionEnd) {
      cont.addEventListener('transitionend', function ft(e) {
        onTransitionEnd();
        cont.removeEventListener('transitionend', ft);
      });
    }
  }