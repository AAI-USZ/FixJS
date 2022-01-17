function() {
  if (!reorderHandlerInstalled) {
    // Make steps sortable by dragging.
    jQuery('#steps').sortable({
      items: ".b-step",
      axis: "y",
      update: function(evt, ui) {
        var reorderedSteps = jQuery('#steps .b-step').get();
        var reorderedIDs = [];
        for (var i = 0; i < reorderedSteps.length; i++) {
          reorderedIDs.push(reorderedSteps[i].id);
        }
        builder.getScript().reorderSteps(reorderedIDs);
      }
    });
    reordered = true;
  }
  builder.stepdisplay.clearDisplay();
  var script = builder.getScript();
  for (var i = 0; i < script.steps.length; i++) {
    addStep(script.steps[i]);
  }
}