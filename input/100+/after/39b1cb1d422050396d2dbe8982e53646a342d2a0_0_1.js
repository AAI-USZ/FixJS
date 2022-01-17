function(id, message, label, accessKey, callback) {
  var action = {
    label: label,
    callback: callback,
    accessKey: accessKey
  };
  if (typeof PopupNotifications != "undefined") {
    var options = {
      timeout: Date.now() + 10000
    };

    PopupNotifications.show(gBrowser.selectedBrowser, id,
      message, "urlbar", action, null, options);
  } else {
    let nb = gBrowser.getNotificationBox();

    nb.appendNotification(
      message, id,
      "chrome://nightly/content/brand/icon.png",
      nb.PRIORITY_INFO_HIGH, [ action ]);
  }
}