function waitForSingleNotification() {
        // Notification should never close while we wait
        ok(PopupNotifications.isPanelOpen, "Notification should still be open");
        if (PopupNotifications.panel.childNodes.length == 2) {
          executeSoon(waitForSingleNotification);
          return;
        }

        is(PopupNotifications.panel.childNodes.length, 1, "Should be only one notification");
        notification = aPanel.childNodes[0];
        is(notification.id, "addon-install-failed-notification", "Should have seen the install fail");

        Services.prefs.setBoolPref(PREF_INSTALL_REQUIREBUILTINCERTS, true);
        wait_for_notification_close(runNextTest);
        gBrowser.removeTab(gBrowser.selectedTab);
      }