function(response) {
  builder.selenium2.rcPlayback.sessionID = response.sessionId;
  builder.selenium2.rcPlayback.playResult.success = true;
  builder.selenium2.rcPlayback.playNextStep();
}