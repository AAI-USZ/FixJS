function(args) {
  this.coordinate = null;
  this.ticksRemaining = null;
  this.burningBlock = null;
  if (args) {
    if (args.coordinate !== undefined) {
      this.coordinate = args.coordinate;
    }
    if (args.ticksRemaining !== undefined) {
      this.ticksRemaining = args.ticksRemaining;
    }
    if (args.burningBlock !== undefined) {
      this.burningBlock = args.burningBlock;
    }
  }
}