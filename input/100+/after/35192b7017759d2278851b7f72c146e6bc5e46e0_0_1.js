function(err) {
  if (builder.selenium2.rcPlayback.currentStepIndex === -1) {
    // If we can't connect to the server right at the start, just attach the error message to the
    // first step.
    builder.selenium2.rcPlayback.currentStepIndex = 0;
  } else {
    if (builder.selenium2.rcPlayback.currentStep.negated && builder.selenium2.rcPlayback.currentStep.type.getName().startsWith("assert")) {
      // Record this as a failed result instead - this way it will be turned into a successful result
      // by recordResult.
      builder.selenium2.rcPlayback.recordResult({success: false});
      return;
    } 
  }
  jQuery("#" + builder.selenium2.rcPlayback.script.steps[builder.selenium2.rcPlayback.currentStepIndex].id + '-content').css('background-color', '#ff3333');
  jQuery("#" + builder.selenium2.rcPlayback.script.steps[builder.selenium2.rcPlayback.currentStepIndex].id + "-error").html(err).show();
  builder.selenium2.rcPlayback.playResult.success = false;
  builder.selenium2.rcPlayback.playResult.errormessage = err;
  
  builder.selenium2.rcPlayback.shutdown();
}