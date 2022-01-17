function() {
    log("stateSignIn");

    status = 'signin';
    document.title = originalTitle;
    
    // notify tomato end
    if (!NOTIFIER.notify(tomatoNotificationIcon, "Tomatoes", "Pomodoro finished!")) {
      log('Permission denied. Click "Request Permission" to give this domain access to send notifications to your desktop.');
    }

    hide([settings.timerId]);
    show([settings.formId]);
  }