function(t) {
  t = builder.selenium2.rcPlayback.fixServerResponse(t);
  if (t.length == 0) {
    return {};
  } else {
    // The response may be some JSON, or it may also be a HTML page.
    try {
      return JSON.parse(t);
    } catch (e) {
      return {};
    }
  }
}