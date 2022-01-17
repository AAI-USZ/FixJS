function(id, message, label, accessKey, callback) {
  var action = {
    label: label,
    callback: callback,
    accessKey: accessKey
  };
  var options = {
    timeout: Date.now() + 10000
  };

  PopupNotifications.show(gBrowser.selectedBrowser, id,
    message, "urlbar", action, null, options);
}