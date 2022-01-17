function (xhr, s) {
    // TODO: i18n
    var msg = "";

    if (xhr.status == 0) {
      msg = "Error while connecting to the server";
    } else if (xhr.status == 500) {
      msg = "Server error";
    } else if (s == "timeout") {
      msg = "The server seems down. Try again later.";
    } else {
      // XXX: Is this still necessary? Review
      // Since we use jquery-jsonp, we must differentiate between
      // the passed arguments
      if (xhr instanceof XMLHttpRequest) {
        msg = $.parseJSON(xhr.responseText).msg;
      } else {
        msg = "Unknown error";
      }
    }

    PTL.editor.displayError(msg);
  }