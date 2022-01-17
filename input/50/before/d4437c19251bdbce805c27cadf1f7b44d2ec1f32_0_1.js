function (e, scope){
  var parser = scope;
  parser.handleError(e, parser);
  if (parser._parser) {
    parser._parser.error = null;
    parser._parser.resume();
  }
}