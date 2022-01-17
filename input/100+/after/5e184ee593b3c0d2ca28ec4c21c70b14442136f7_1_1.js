function onaphlictmessage(type, message) {
    if (type == 'receive') {
      var request = new JX.Request('/notification/individual/', onnotification)
        .addData({key: message.key})
        .send();
    } else if (__DEV__) {
      if (config.debug) {
        var details = message
          ? JX.JSON.stringify(message)
          : '';

        new JX.Notification()
          .setContent('(Aphlict) [' + type + '] ' + details)
          .setClassName('jx-notification-debug')
          .setDuration(0)
          .show();
      }
    }
  }