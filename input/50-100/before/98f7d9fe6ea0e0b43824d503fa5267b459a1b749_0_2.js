function(response, errorThrown) {
  var err = "Server Error";
  if (response.value && response.value.message) {
    err += ": " + response.value.message;
  } else {
    if (errorThrown) { err += ": " + errorThrown; }
  }
  builder.selenium2.rcPlayback.recordError(err);
}