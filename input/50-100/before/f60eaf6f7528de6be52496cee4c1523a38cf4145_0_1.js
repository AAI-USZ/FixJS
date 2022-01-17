function(data, cb) {
  if(this.writable) {
    var out = this._write(2, data, this.id, cb);
    console.log(out);
    return !this._paused && out;
  } else {
    throw new Error('Stream is not writable');
  }
}