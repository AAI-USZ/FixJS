function(evt, ui) {
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