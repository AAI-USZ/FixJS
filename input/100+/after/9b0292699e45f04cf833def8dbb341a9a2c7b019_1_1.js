function() {
  if (!reorderHandlerInstalled) {
    // Make steps sortable by dragging.
    jQuery('#steps').sortable({
      items: ".b-step",
      axis: "y",
      update: function(evt, ui) {
        var reorderedSteps = jQuery('#steps .b-step').get();
        alert(reorderedSteps.length);
        var reorderedIDs = [];
        for (var i = 0; i < reorderedSteps.length; i++) {
          // Filter out elements that aren't actually steps. (?)
          if (builder.getScript().getStepIndexForID(reorderedSteps[i].id) != -1) {
            reorderedIDs.push(reorderedSteps[i].id);
          }
        }
        builder.getScript().reorderSteps(reorderedIDs);
      }
    });
    reorderHandlerInstalled = true;
  }
  builder.stepdisplay.clearDisplay();
  var script = builder.getScript();
  for (var i = 0; i < script.steps.length; i++) {
    addStep(script.steps[i]);
  }
}