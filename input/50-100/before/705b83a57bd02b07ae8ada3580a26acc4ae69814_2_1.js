function(cb) {
  if (typeof(define) === 'function' && define.amd) {
    require(['contracts'], cb);
  } else if (typeof(require) === 'function') {
    cb(require('contracts.js'));
  } else {
    cb(window.contracts);
  }
}