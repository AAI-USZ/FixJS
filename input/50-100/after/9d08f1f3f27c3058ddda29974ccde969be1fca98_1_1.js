function(thePostPlayCallback) {
  if (builder.getScript().steps[0].type == builder.selenium1.stepTypes.open) {
    builder.deleteURLCookies(builder.getScript().steps[0].url);
  }
  builder.selenium1.playback.runtestbetween(0, 0, thePostPlayCallback);
}