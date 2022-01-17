function(id) {
    var index = this.getStepIndexForID(id);
    return index == -1 ? null : this.steps[index];
  }