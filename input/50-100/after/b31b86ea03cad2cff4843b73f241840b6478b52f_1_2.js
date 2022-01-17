function handleHeader () {
  var count = parseInt(this.stash.toString(), 16) || 0;
  if (count > 0 && count < MAX_MESSAGE_SIZE)
    this.resetBuffer(count, this.handleMessage);
  else
    this.resetBuffer();
}