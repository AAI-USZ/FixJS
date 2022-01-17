function(path, msg, callback, http_method) {
  var url = null;
  if (builder.selenium2.rcPlayback.sessionID) {
    url = "http://" + builder.selenium2.rcPlayback.hostPort + "/wd/hub/session/" + builder.selenium2.rcPlayback.sessionID + path;
  } else {
    url = "http://" + builder.selenium2.rcPlayback.hostPort + "/wd/hub/session";
  }
  jQuery.ajax({
    // Because the server appends null characters to its output, we want to disable automatic
    // JSON parsing in jQuery.
    dataType: "html",
    // But because the server crashes if we don't accept application/json, we explicitly set it to.
    headers: { 
      "Accept" : "application/json, image/png",
      "Content-Type": "text/plain; charset=utf-8"
    },
    type: http_method || "POST",
    url: url,
    data: msg,
    // Automatically chop off the null characters from the response.
    success: function(t) { callback(builder.selenium2.rcPlayback.fixServerResponse(t)); },
    error: builder.selenium2.rcPlayback.xhrfailed
  });
}