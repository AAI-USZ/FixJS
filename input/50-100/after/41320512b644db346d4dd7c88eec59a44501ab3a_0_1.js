function(responseText) {
  var response = JSON.parse(responseText);
  builder.selenium2.rcPlayback.sessionID = response.sessionId;
  //alert(JSON.stringify(response));
  //alert(builder.selenium2.rcPlayback.sessionID);
  builder.selenium2.rcPlayback.playResult.success = true;
  builder.selenium2.rcPlayback.playNextStep(null);
}