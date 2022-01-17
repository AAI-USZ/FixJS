function icon_onDragStop(callback) {
    var rect = this.container.getBoundingClientRect();
    var x = (Math.abs(rect.left + rect.right) / 2) % window.innerWidth;
    x -= this.initXCenter;

    var y = (rect.top + rect.bottom) / 2;
    y -= this.initYCenter;

    var draggableElem = this.draggableElem;
    var style = draggableElem.style;
    style.MozTransition = '-moz-transform .4s';
    style.MozTransform = 'translate(' + x + 'px,' + y + 'px)';
    draggableElem.querySelector('div').style.MozTransform = 'scale(1)';

    var self = this;
    draggableElem.addEventListener('transitionend', function draggableEnd(e) {
      draggableElem.removeEventListener('transitionend', draggableEnd);
      delete self.container.dataset.dragging;
      self.dragabbleSection.removeChild(this);
      callback();
    });
  }