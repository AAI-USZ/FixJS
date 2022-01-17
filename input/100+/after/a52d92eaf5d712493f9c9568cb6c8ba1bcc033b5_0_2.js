function Bench (title, fn) {
  EventEmitter.call(this);
  this.title = title;
  this.fn = fn;
}