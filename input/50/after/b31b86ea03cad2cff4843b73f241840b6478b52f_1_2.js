function handleMessage (str) {
  this.onMessage(readFromString(this.stash.toString())); // FIXME: handle errors
  this.resetBuffer();
}