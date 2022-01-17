function(args) {
  this.coordinate = null;
  this.ticksRemaining = null;
  if (args) {
    if (args.coordinate !== undefined) {
      this.coordinate = args.coordinate;
    }
    if (args.ticksRemaining !== undefined) {
      this.ticksRemaining = args.ticksRemaining;
    }
  }
}