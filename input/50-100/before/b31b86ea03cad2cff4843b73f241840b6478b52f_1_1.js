function handleContent (text, offset) {
  var stashLen = this.stash.length;
  var avail = Math.min(this.needChars, text.length + stashLen - offset);
  var message = this.stash + text.substring(offset, offset + avail - stashLen);
  if (avail < this.needChars)
    this.stash = message;
  else {
    this.stash = "";
    this.handleData(message);
  }
  return message.length - stashLen;
}