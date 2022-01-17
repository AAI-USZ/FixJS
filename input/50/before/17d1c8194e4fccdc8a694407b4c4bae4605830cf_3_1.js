function () {
    findCursor.stop();
    me.unset("counts", uuid, ["count"]);
    me.flush();
  }