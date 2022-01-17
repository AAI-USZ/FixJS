function (e, scope, next){
  var parser = scope;
  parser.emit('error', e);
  parser.errors.push(e);
  if (typeof next === 'function') {
    next();
  } else {
    parser.handleEnd(parser);
  }
}