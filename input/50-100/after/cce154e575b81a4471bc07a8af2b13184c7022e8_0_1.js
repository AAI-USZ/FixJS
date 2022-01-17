function wait_for_single_notification(aCallback) {
  function inner_waiter() {
    info("Waiting for single notification");
    // Notification should never close while we wait
    ok(PopupNotifications.isPanelOpen, "Notification should still be open");
    if (PopupNotifications.panel.childNodes.length == 2) {
      executeSoon(inner_waiter);
      return;
    }

    aCallback();
  }

  executeSoon(inner_waiter);
}