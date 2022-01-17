function receiver(evt) {
      var message = JSON.parse(evt.data);
      if (message.action !== 'updateHeight')
        return;

      var app = WindowManager.getDisplayedApp();
      if (!app && !TrustedDialog.trustedDialogIsShown())
        return;

      var currentApp;
      if (TrustedDialog.trustedDialogIsShown()) {
        currentApp = TrustedDialog.getFrame();
      } else {
        // Reset the height of the app
        WindowManager.setAppSize(app);
        currentApp = WindowManager.getAppFrame(app);
      }

      if (!message.hidden) {
        var height = (parseInt(currentApp.style.height) -
                      message.keyboardHeight);

        keyboardOverlay.style.height = (height + 20) + 'px';

        currentApp.style.height = height + 'px';
        currentApp.classList.add('keyboardOn');
        keyboardFrame.classList.remove('hide');
      } else {
        currentApp.classList.remove('keyboardOn');
        keyboardFrame.classList.add('hide');
      }
    }