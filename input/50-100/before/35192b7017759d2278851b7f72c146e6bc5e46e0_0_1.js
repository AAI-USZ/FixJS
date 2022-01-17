function(response) {
  var err = "Server Error";
  if (response.value && response.value.message) {
    err += ": " + response.value.message;
  }
  builder.selenium2.rcPlayback.recordError(err);
}