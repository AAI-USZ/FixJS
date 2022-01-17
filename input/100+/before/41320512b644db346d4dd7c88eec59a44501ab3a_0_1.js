function(xhr, textStatus, errorThrown) {
  var err = "Server connection error: " + errorThrown;
  if (builder.selenium2.rcPlayback.currentStepIndex === -1) {
    // If we can't connect to the server right at the start, just attach the error message to the
    // first step.
    builder.selenium2.rcPlayback.currentStepIndex = 0;
  }
  jQuery("#" + builder.selenium2.rcPlayback.script.steps[builder.selenium2.rcPlayback.currentStepIndex].id + '-content').css('background-color', '#ff3333');
  jQuery("#" + builder.selenium2.rcPlayback.script.steps[builder.selenium2.rcPlayback.currentStepIndex].id + "-error").html(err).show();
  builder.selenium2.rcPlayback.result.success = false;
  builder.selenium2.rcPlayback.result.errormessage = err;
  jQuery('#edit-editing').show();
  jQuery('#edit-rc-playing').hide();
  jQuery('#edit-rc-stopping').hide();
  
  if (builder.selenium2.rcPlayback.postRunCallback) {
    builder.selenium2.rcPlayback.postRunCallback(builder.selenium2.rcPlayback.result);
  }
}