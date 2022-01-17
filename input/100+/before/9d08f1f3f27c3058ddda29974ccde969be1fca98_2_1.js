function(postPlayCallback) {
  builder.selenium2.playback.vars = {};
  builder.selenium2.playback.runTestBetween(
    postPlayCallback,
    builder.getScript().steps[0].id,
    builder.getScript().steps[builder.getScript().steps.length - 1].id
  );
}