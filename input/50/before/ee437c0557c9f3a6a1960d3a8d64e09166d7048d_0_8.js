function flush(cb) {
  this._flush = binding.Z_SYNC_FLUSH;
  return this.write(cb);
}