function(packetSwitch) {
  packetSwitch.register(
      gf.net.packets.ExecCommands.ID,
      this.handleExecCommands_, this);
}