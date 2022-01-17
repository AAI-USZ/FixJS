function handleHeader (str) {
  var count = parseInt(str, 16) || 0;
  if (count > 0 && count < MAX_MESSAGE_SIZE) {
    this.needChars = count;
    this.handleData = this.handleMessage;
  } else
    this.needChars = HEADER_LEN; // FIXME: handle errors
}