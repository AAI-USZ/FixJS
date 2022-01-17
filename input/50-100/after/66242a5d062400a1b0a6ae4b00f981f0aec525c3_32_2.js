function ns_tap(notificationNode) {
    var notificationID = notificationNode.dataset.notificationID;

    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('mozContentEvent', true, true, {
      type: 'desktop-notification-click',
      id: notificationID
    });
    window.dispatchEvent(event);

    this.removeNotification(notificationNode.dataset.notificationID);

    if (notificationNode == this.toaster) {
      this.toaster.classList.remove('displayed');
    } else {
      UtilityTray.hide();
    }
  }