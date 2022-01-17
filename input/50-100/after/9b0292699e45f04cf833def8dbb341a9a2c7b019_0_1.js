function(stepID, afterStepID) {
    var step = this.removeStepWithID(stepID);
    if (this.getLastStep().id == afterStepID) {
      this.steps.push(step);
    } else {
      this.steps.splice(this.getStepIndexForID(afterStepID) + 1, 0, step);
    }
  }