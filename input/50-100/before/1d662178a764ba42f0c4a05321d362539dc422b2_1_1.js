function WritableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred
   * or end() / destroy() was called.
   *
   * デフォルト true. 'error', end(), destroy() で false になる。
   */
  this.writable = true;
}