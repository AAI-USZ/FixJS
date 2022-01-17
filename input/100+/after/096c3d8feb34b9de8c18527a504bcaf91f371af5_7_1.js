function(packet) {
  if (packet instanceof Packets.RowDataPacket) {
    this._rows.push(packet);
    return;
  }

  if (packet instanceof Packets.OkPacket) {
    this._callback(null);
    return;
  }

  if (packet instanceof Packets.ErrorPacket) {
    this._callback(new Error(packet.message));
    return;
  }

  if (packet instanceof Packets.FieldPacket) {
    this._fieldPackets.push(packet);
    return;
  }


  if (packet instanceof Packets.EofPacket) {
    this._eofCount++;

    if (this._eofCount === 2) {
      this._callback(null, this._rows);
    }
  }
}