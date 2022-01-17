function () {
    signalHandle.stop();
    me.unset("counts", uuid, ["count"]);
    me.flush();
  }