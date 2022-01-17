function ReadableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred,
   * the stream came to an 'end', or destroy() was called.
   *
   * デフォルト True で 'error', 'end', destroy() で false になる。
   */
  this.readable = true;
  this.encoding = 'utf8';
}