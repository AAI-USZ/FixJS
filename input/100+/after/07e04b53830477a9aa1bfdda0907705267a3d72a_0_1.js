function (xhr, s) {
    var msg = "";

    if (xhr.status == 0) {
      msg = gettext("Error while connecting to the server");
    } else if (xhr.status == 500) {
      msg = gettext("Server error");
    } else if (s == "timeout") {
      msg = gettext("The server seems down. Try again later.");
    } else {
      // XXX: Is this still necessary? Review
      // Since we use jquery-jsonp, we must differentiate between
      // the passed arguments
      if (xhr instanceof XMLHttpRequest) {
        msg = $.parseJSON(xhr.responseText).msg;
      } else {
        msg = gettext("Unknown error");
      }
    }

    PTL.editor.displayError(msg);
  }