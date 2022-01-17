function (lines) {
  while (g() && lines > 0) {
    if (this.cursor > this.buffer.length)
      break;
    if (this.buffer.charAt(this.cursor++) == '\n') --lines;
  }
  while (g() && lines < 0) {
    if (!this.cursor)
      break;
    if (this.buffer.charAt(this.cursor--) == '\n') ++lines;
  }
  if (this.cursor > 0 && this.cursor >= this.buffer.length-1)
    this.cursor = this.buffer.length-1;
}