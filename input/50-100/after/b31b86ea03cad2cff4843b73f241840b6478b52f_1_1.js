function execute (buffer) {
  var offset = 0;
  while (offset < buffer.length)
    offset += this.handleContent(buffer, offset);
}