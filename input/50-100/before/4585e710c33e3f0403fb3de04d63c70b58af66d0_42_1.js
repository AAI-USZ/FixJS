function showFailure(error, info, callback) {
    info = $.extend(info || {}, { action: error, dialog: false });
    bid.Screens.error.show("error", info);
    errorDisplay.start();
    callback && callback(false);
  }