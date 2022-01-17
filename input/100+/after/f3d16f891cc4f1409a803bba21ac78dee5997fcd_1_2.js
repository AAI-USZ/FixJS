function icon_onDragStop(callback) {
    var draggableElem = this.draggableElem;
    var targetRect = this.container.getBoundingClientRect();
    var x = (Math.abs(targetRect.left + targetRect.right) / 2)
            % window.innerWidth;
    var y = (targetRect.top + targetRect.bottom) / 2;
    draggableElem.style.MozTransition = '-moz-transform .4s';
    draggableElem.style.MozTransform =
        'translate(' + (x - this.initXCenter) + 'px,' +
        (y - this.initYCenter) + 'px)';
    draggableElem.querySelector('div').style.MozTransform = 'scale(1)';

    var that = this;
    draggableElem.addEventListener('transitionend', function ft(e) {
      this.removeEventListener('transitionend', ft);
      delete that.container.dataset.dragging;
      that.dragabbleSection.removeChild(this);
      callback();
    });
  }