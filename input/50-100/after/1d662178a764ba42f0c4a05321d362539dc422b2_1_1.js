function WritableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred
   * or end() / destroy() was called.
   *
   * デフォルト true. 'error', end(), destroy() で false になる。
   */
  this.writable = true;

  /**
   * Event: 'drain'
   * After a write() method returned false,
   * this event is emitted to indicate that it is safe to write again.
   *
   * wrtite() が false を返した後に発生。
   * 再度書き込みが可能なことを知らせる。
   */
  this.on('drain', function() {
  }.bind(this));

  /**
   * Event: 'error'
   * Emitted on error with the exception exception.
   *
   * エラー発生時に、コールバックに exception を渡す。
   */
  this.on('error', function(exception) {
    this.writable = false;
  }.bind(this));

  /**
   * Event: 'close'
   * Emitted when the underlying file descriptor has been closed.
   *
   * file descriptor が close した時に発生
   */
  this.on('close', function() {

  }.bind(this));

  /**
   * Event: 'pipe'
   * Emitted when the stream is passed to a readable stream's pipe method.
   *
   * 自身が readable stream の pipe() に渡された時に発生。
   */
  this.on('pipe', function(reabable) {

  }.bind(this));
}