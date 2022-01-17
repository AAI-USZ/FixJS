function(command) {
  if (command instanceof gf.sim.commands.ReparentCommand) {
    if (command.parentId == gf.sim.NO_ENTITY_ID) {
      this.setParent(null);
    } else {
      var parentEntity = this.simulator.getEntity(command.parentId);
      goog.asserts.assert(parentEntity);
      this.setParent(parentEntity);
    }
  }
}