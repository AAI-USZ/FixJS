function (regexp) {
  var title = handlers[regexp], config = this.config, re = new RegExp(regexp, 'gi');

  // Add route to channel.
  this.io.route(re, this, function (info, cb) {
    title.handler(info.message.match(new RegExp(regexp)), cb); // FIXME: Closure problem.
  }, title.formatter);
}