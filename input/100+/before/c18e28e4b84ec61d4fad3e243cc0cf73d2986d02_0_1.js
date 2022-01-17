function(hostPort, browserstring, postRunCallback) {
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
  builder.selenium2.rcPlayback.post(
    "",
    JSON.stringify({"desiredCapabilities":{"platform":"ANY","browserName":"firefox","version":""}}), // qqDPS
    builder.selenium2.rcPlayback.startJob);
}