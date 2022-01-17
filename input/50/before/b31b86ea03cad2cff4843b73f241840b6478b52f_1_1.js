function SwankParser (onMessage) {
  this.needChars = HEADER_LEN;
  this.handleData = this.handleHeader;
  this.stash = "";
  this.onMessage = onMessage;
}