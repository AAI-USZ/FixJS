function() {
  if (isBlankOrUndef(this.fields.end)) {
    // If there's no end time, infer one as best as we can.
    this.fields.end = this.inferEndTime_(this.fields.start);
  }
}