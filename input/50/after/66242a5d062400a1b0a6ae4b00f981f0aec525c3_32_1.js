function trWait() {
        nextNotification.removeEventListener('transitionend', trWait);
        nextNotification.style.MozTransition = '';
        nextNotification.style.MozTransform = '';

        notificationNode.parentNode.removeChild(notificationNode);
        self.updateStatusBarIcon();
      }