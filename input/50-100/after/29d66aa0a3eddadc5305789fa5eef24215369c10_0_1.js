function(args) {
  this.gameId = null;
  this.ticks = null;
  if (args) {
    if (args.gameId !== undefined) {
      this.gameId = args.gameId;
    }
    if (args.ticks !== undefined) {
      this.ticks = args.ticks;
    }
  }
}