function (e, scope){
  var parser = scope;
  parser.emit('error', e);
  parser.errors.push(e);
}