function receiver(evt) {
      var message = JSON.parse(evt.data);

      if (message.action !== 'updateHeight')
        return;

      var app = WindowManager.getDisplayedApp();

      if (!app)
        return;

      var currentApp = WindowManager.getAppFrame(app);
      // Reset the height of the app
      WindowManager.setAppSize(app);

      if (!message.hidden) {
        currentApp.style.height =
          (currentApp.offsetHeight - message.keyboardHeight) + 'px';
        currentApp.classList.add('keyboardOn');
      } else {
        currentApp.classList.remove('keyboardOn');
        keyboardFrame.classList.add('hide');
      }
    }