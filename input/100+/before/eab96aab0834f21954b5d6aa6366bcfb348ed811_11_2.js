function(pc, sp, func, vmState, stack) {
  this.ticks_.total++;
  if (vmState == TickProcessor.VmStates.GC) this.ticks_.gc++;
  if (!this.includeTick(vmState)) {
    this.ticks_.excluded++;
    return;
  }

  if (func) {
    var funcEntry = this.profile_.findEntry(func);
    if (!funcEntry || !funcEntry.isJSFunction || !funcEntry.isJSFunction()) {
      func = 0;
    } else {
      var currEntry = this.profile_.findEntry(pc);
      if (!currEntry || !currEntry.isJSFunction || currEntry.isJSFunction()) {
        func = 0;
      }
    }
  }

  this.profile_.recordTick(this.processStack(pc, func, stack));
}