function(addr, pos) {
  if (this.snapshotLogProcessor_) {
    this.deserializedEntriesNames_[addr] =
      this.snapshotLogProcessor_.getSerializedEntryName(pos);
  }
}