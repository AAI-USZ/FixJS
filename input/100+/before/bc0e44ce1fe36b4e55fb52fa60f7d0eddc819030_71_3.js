function ns_removeNotification(notificationNode) {
    // Animating the next notification up
    var nextNotification = notificationNode.nextSibling;
    if (nextNotification) {
      nextNotification.style.MozTransition = '-moz-transform 0.2s linear';
      nextNotification.style.MozTransform = 'translateY(-80px)';

      nextNotification.addEventListener('transitionend', function trWait() {
        nextNotification.removeEventListener('transitionend', trWait);
        nextNotification.style.MozTransition = '';
        nextNotification.style.MozTransform = '';

        notificationNode.parentNode.removeChild(notificationNode);
      });
    } else {
      notificationNode.parentNode.removeChild(notificationNode);

      // Hiding the notification indicator in the status bar
      // if this is the last desktop notification
      var notifSelector = 'div[data-type="desktop-notification"]';
      var desktopNotifications = this.container.querySelectorAll(notifSelector);
      if (desktopNotifications.length == 0) {
        StatusBar.updateNotification(false);
      }
    }
  }