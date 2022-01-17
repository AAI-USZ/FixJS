function(packetSwitch) {
  packetSwitch.register(
      gf.sim.packets.ExecCommands.ID,
      this.handleExecCommands_, this);
}