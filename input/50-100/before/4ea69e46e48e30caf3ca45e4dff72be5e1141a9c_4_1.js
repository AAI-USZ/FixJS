function() {
  if (this.unusedCommands_.length) {
    var command = this.unusedCommands_.pop();
    // Reset the important fields that everyone will mess up
    command.targetEntityId = gf.sim.NO_ENTITY_ID;
    return command;
  } else {
    return new this.commandCtor_();
  }
}