function ns_swipe(evt) {
    var detail = evt.detail;
    var distance = detail.start.screenX - detail.end.screenX;
    var fastEnough = Math.abs(detail.vx) > this.TRANSITION_SPEED;
    var farEnough = Math.abs(distance) >
      this._containerWidth * this.TRANSITION_FRACTION;

    if (!(farEnough || fastEnough)) {
      // Werent far or fast enough to delete, restore
      var time = Math.abs(distance) / this.TRANSITION_SPEED;
      var transition = '-moz-transform ' + time + 'ms linear';

      var notificationNode = this._notification;
      notificationNode.style.MozTransition = transition;
      notificationNode.style.MozTransform = 'translateX(0px)';
      notificationNode.style.opacity = 1;
      delete this._notification;
      return;
    }

    var speed = Math.max(Math.abs(detail.vx), 1.8);
    var time = (this._containerWidth - Math.abs(distance)) / speed;
    var offset = detail.direction === 'right' ?
      this._containerWidth : -this._containerWidth;

    this._notification.style.MozTransition = '-moz-transform ' +
      time + 'ms linear';
    this._notification.style.MozTransform = 'translateX(' + offset + 'px)';
    var self = this;
    this._notification.addEventListener('transitionend', function trListener() {
      self._notification.removeEventListener('transitionend', trListener);

      self.removeNotification(self._notification);
      self._notification = null;
    });
  }