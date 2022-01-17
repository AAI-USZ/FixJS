function ReadableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred,
   * the stream came to an 'end', or destroy() was called.
   *
   * デフォルト True で 'error', 'end', destroy() で false になる。
   */
  this.readable = true;
  this.encoding = 'utf8';

  /**
   * Event: 'data'
   * The 'data' event emits either a Buffer (by default) or a string if setEncoding() was used.
   *
   * イベント発生時は Buffer(デフォルト) か string が使われる。
   */
  this.on('data', function(data) {

  }.bind(this));

  /**
   * Event: 'end'
   * Emitted when the stream has received an EOF (FIN in TCP terminology).
   * Indicates that no more 'data' events will happen.
   * If the stream is also writable, it may be possible to continue writing.
   *
   * stream が EOF, FIN などで終わった時 emit される。
   * これ以上 'data' イベントは発生しない。
   * writable だった場合、書き込みは可能。
   */
  this.on('end', function() {
    this.readable = false;
  }.bind(this));

  /**
   * Event: 'error'
   * Emitted if there was an error receiving data.
   *
   * エラーが発生した時。
   */
  this.on('error', function(exception) {
    this.readable = false;
  }.bind(this));

  /**
   * Event: 'close'
   * Emitted when the underlying file descriptor has been closed.
   * Not all streams will emit this.
   * (For example, an incoming HTTP request will not emit 'close'.)
   *
   * file descriptor などが close された時。
   * 全ての stream で発生するとは限らない。(HTTP リクエストなど)
   */
  this.on('close', function() {

  }.bind(this));
}