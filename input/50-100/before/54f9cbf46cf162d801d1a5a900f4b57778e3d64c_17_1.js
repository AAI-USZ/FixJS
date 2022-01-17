function createMachine() {
    machine = bid.State.create();
    actions = new ActionsMock();
    machine.start({controller: actions});
  }