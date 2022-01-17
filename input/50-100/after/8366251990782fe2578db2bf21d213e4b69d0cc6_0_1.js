function handleInv(e) {
  var invs = e.message.invs;

  // The remote side will send an inv with a single block to signify the
  // download is complete.
  if (invs.length == 1 && invs[0].type == 2) {
    this.emit('success', {
      invs: invs,
      conn: e.conn
    });
    this.close();
  }
}