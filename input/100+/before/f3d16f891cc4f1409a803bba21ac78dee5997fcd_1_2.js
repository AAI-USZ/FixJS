function icon_onDragStop(callback) {
    var draggableElem = this.draggableElem;
    draggableElem.style.MozTransition = '-moz-transform .4s';
    draggableElem.style.MozTransform =
        'translate(' + (this.targetXCenter - this.initXCenter) + 'px,' +
        (this.targetYCenter - this.initYCenter) + 'px)';
    draggableElem.querySelector('div').style.MozTransform = 'scale(1)';

    var that = this;
    draggableElem.addEventListener('transitionend', function ft(e) {
      this.removeEventListener('transitionend', ft);
      delete that.container.dataset.dragging;
      that.dragabbleSection.removeChild(this);
      callback();
    });
  }