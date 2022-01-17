function(postPlayCallback) {
  if (builder.getScript().steps[0].type == builder.selenium2.stepTypes.get) {
    builder.deleteURLCookies(builder.getScript().steps[0].url);
  }
  builder.selenium2.playback.vars = {};
  builder.selenium2.playback.runTestBetween(
    postPlayCallback,
    builder.getScript().steps[0].id,
    builder.getScript().steps[builder.getScript().steps.length - 1].id
  );
}