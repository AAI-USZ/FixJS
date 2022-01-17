function(response, errorThrown) {
  var err = "Server Error";
  if (errorThrown) { err += ": " + errorThrown; }
  if (response.value && response.value.message) {
    err += ": " + response.value.message.substring(0, 256);
  }
  builder.selenium2.rcPlayback.recordError(err);
}