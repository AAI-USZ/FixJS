function(command) {
  if (command instanceof gf.sim.commands.ReparentCommand) {
    this.setParent(command.parentId);
  }
}