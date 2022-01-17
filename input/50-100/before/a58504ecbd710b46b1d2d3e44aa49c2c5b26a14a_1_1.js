function (regexp) {
  var title = handlers[regexp], config = this.config;

  // Add route to channel.
  this.io.route( new RegExp(regexp, 'gi'), this, function (info, cb) {
    title.handler(new RegExp(regexp).exec(info.message), cb);
  }, title.formatter);
}