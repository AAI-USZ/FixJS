function N3Parser(config) {
  config = config || {};
  
  // We use a dummy constructor to enable construction without `new`.
  function Constructor() {}
  Constructor.prototype = N3Parser.prototype;
  
  // Initialize the new `N3Parser`.
  var n3Parser = new Constructor();
  n3Parser._lexer = config.lexer || new N3Lexer();
  n3Parser._blankNodes = Object.create(null);
  n3Parser._blankNodeCount = 0;
  n3Parser._tripleStack = [];
  n3Parser._baseURI = n3Parser._documentURI = config.documentURI || null;
  
  // Return the new `N3Parser`.
  return n3Parser;
}