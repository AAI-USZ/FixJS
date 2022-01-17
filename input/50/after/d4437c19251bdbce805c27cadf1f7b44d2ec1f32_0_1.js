function(){
    if (parser._parser) {
      parser._parser.error = null;
      parser._parser.resume();
    }
  }