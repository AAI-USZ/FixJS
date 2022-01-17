function() {
      Services.obs.removeObserver(arguments.callee, "addon-install-failed");

      // Allow the browser code to add the failure notification and then wait
      // for the progress notification to dismiss itself
      wait_for_single_notification(function() {
        is(PopupNotifications.panel.childNodes.length, 1, "Should be only one notification");
        notification = aPanel.childNodes[0];
        is(notification.id, "addon-install-failed-notification", "Should have seen the install fail");

        Services.prefs.setBoolPref(PREF_INSTALL_REQUIREBUILTINCERTS, true);
        wait_for_notification_close(runNextTest);
        gBrowser.removeTab(gBrowser.selectedTab);
      });
    }