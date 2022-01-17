function(args) {
  this.ticks = null;
  if (args) {
    if (args.ticks !== undefined) {
      this.ticks = args.ticks;
    }
  }
}