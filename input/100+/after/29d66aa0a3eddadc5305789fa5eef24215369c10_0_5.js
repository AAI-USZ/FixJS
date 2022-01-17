function(args) {
  this.gameId = null;
  if (args) {
    if (args.gameId !== undefined) {
      this.gameId = args.gameId;
    }
  }
}