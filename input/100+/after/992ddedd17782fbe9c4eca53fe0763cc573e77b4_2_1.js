function receiver(evt) {
      var message = JSON.parse(evt.data);

      if (message.action !== 'updateHeight')
        return;

      var app = WindowManager.getDisplayedApp();

      if (!app)
        return;

      // Reset the height of the app
      WindowManager.setAppSize(app);
      var currentApp = WindowManager.getAppFrame(app);

      if (!message.hidden) {
        currentApp.style.height =
          (parseInt(currentApp.style.height) - message.keyboardHeight) + 'px';
        currentApp.classList.add('keyboardOn');
      } else {
        currentApp.classList.remove('keyboardOn');
        keyboardFrame.classList.add('hide');
      }
    }