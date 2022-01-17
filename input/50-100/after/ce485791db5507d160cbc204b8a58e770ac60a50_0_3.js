function() {
  // Cursor to left edge.
  this.output.cursorTo(0);

  // Write the prompt and the current buffer content.
  this.output.write(this._prompt);
  this.output.write(this.line);

  // Erase to right.
  this.output.clearLine(1);

  // Move cursor to original position.
  this.output.cursorTo(this._promptLength + this.cursor);
}