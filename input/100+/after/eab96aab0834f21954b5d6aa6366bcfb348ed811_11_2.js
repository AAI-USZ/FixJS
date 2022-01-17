function(pc, sp, vmState, stack) {
  this.ticks_.total++;
  if (vmState == TickProcessor.VmStates.GC) this.ticks_.gc++;
  if (!this.includeTick(vmState)) {
    this.ticks_.excluded++;
    return;
  }

  this.profile_.recordTick(this.processStack(pc, stack));
}