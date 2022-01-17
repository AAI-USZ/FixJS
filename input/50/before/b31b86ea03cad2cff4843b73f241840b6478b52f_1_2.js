function handleMessage (str) {
  this.onMessage(readFromString(str)); // FIXME: handle errors
  this.needChars = HEADER_LEN;
  this.handleData = this.handleHeader;
}