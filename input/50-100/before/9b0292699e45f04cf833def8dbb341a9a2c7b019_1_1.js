function(evt, ui) {
        var reorderedSteps = jQuery('#steps .b-step').get();
        var reorderedIDs = [];
        for (var i = 0; i < reorderedSteps.length; i++) {
          reorderedIDs.push(reorderedSteps[i].id);
        }
        builder.getScript().reorderSteps(reorderedIDs);
      }