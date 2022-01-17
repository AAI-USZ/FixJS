function onaphlictmessage(type, message) {
    if (!message) {
      return;
    }

    if (type != 'receive') {
      return;
    }

    var request = new JX.Request('/notification/individual/', onnotification)
      .addData({key: message.key})
      .send();
  }