function(stepId) {
      console.log("Looking for step w/ id " + stepId);
      return $(this.steps.filter("#" + stepId)[0]);
    }