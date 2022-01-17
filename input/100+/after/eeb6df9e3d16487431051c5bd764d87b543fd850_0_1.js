function ns_removeNotification(notificationID) {
    var notifSelector = '[data-notification-i-d="' + notificationID + '"]';
    var notificationNode = this.container.querySelector(notifSelector);
    // Animating the next notification up
    var nextNotification = notificationNode.nextSibling;
    if (nextNotification) {
      nextNotification.style.MozTransition = '-moz-transform 0.2s linear';
      nextNotification.style.MozTransform = 'translateY(-80px)';

      var self = this;
      nextNotification.addEventListener('transitionend', function trWait() {
        nextNotification.removeEventListener('transitionend', trWait);
        nextNotification.style.MozTransition = '';
        nextNotification.style.MozTransform = '';

        notificationNode.parentNode.removeChild(notificationNode);
        self.updateStatusBarIcon();
      });
    } else {
      notificationNode.parentNode.removeChild(notificationNode);
      this.updateStatusBarIcon();
    }
  }