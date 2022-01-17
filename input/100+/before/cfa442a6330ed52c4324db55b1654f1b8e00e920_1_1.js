function(hostPort, browserstring, browserversion, platform, postRunCallback) {
  jQuery('#steps-top')[0].scrollIntoView(false);
  jQuery('#edit-rc-playing').show();
  jQuery('#edit-rc-stopping').hide();
  builder.selenium2.rcPlayback.requestStop = false;
  builder.selenium2.rcPlayback.playResult = { success: false };
  builder.selenium2.rcPlayback.hostPort = hostPort;
  builder.selenium2.rcPlayback.browserstring = browserstring;
  builder.selenium2.rcPlayback.currentStepIndex = -1;
  builder.selenium2.rcPlayback.currentStep = null;
  builder.selenium2.rcPlayback.script = builder.getScript();
  builder.selenium2.rcPlayback.vars = {};
  builder.views.script.clearResults();
  jQuery('#edit-clearresults-span').show();
  builder.selenium2.rcPlayback.sessionID = null;
  jQuery('#edit-rc-connecting').show();
  var name = "Untitled";
  if (builder.selenium2.rcPlayback.script.path) {
    var name = builder.selenium2.rcPlayback.script.path.path.split("/");
    name = name[name.length - 1];
    name = name.split(".")[0];
  }
  name = "SeBuilder " + browserstring + " " + (browserversion ? browserversion + " " : "") + (platform ? platform + " " : "") + name;
  builder.selenium2.rcPlayback.send(
    "POST",
    "",
    JSON.stringify({"desiredCapabilities":{
      "name": name,
      "platform":"ANY",
      "browserName":browserstring||"firefox",
      "version":browserversion||"",
      "platform":platform||""}}),
    builder.selenium2.rcPlayback.startJob);
}