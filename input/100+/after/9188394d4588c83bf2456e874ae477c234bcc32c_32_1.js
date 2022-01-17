function ns_swipe(evt) {
    var detail = evt.detail;
    var distance = detail.start.screenX - detail.end.screenX;
    var fastEnough = Math.abs(detail.vx) > this.TRANSITION_SPEED;
    var farEnough = Math.abs(distance) >
      this._containerWidth * this.TRANSITION_FRACTION;

    if (!(farEnough || fastEnough)) {
      // Werent far or fast enough to delete, restore
      delete this._notification;
      return;
    }

    var offset = detail.direction === 'right' ?
      this._containerWidth : -this._containerWidth;

    this._notification.style.MozTransition = '-moz-transform 0.3s linear';
    this._notification.style.MozTransform = 'translateX(' + offset + 'px)';

    var notification = this._notification;
    this._notification = null;

    var toaster = this.toaster;
    var self = this;
    notification.addEventListener('transitionend', function trListener() {
      notification.removeEventListener('transitionend', trListener);

      self.removeNotification(notification.dataset.notificationID);

      if (notification != toaster)
        return;

      // Putting back the toaster in a clean state for the next notification
      toaster.style.display = 'none';
      setTimeout(function nextLoop() {
        toaster.style.MozTransition = '';
        toaster.style.MozTransform = '';
        toaster.classList.remove('displayed');

        setTimeout(function nextLoop() {
          toaster.style.display = 'block';
        });
      });
    });
  }