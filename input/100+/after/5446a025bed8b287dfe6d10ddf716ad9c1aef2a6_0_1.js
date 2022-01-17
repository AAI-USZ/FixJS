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
  if (!config.documentURI) {
    n3Parser._baseURI = n3Parser._documentURI = null;
    n3Parser._baseURIROOT = n3Parser._documentURIRoot = null;
  }
  else {
    n3Parser._baseURI = n3Parser._documentURI = config.documentURI;
    n3Parser._baseURIRoot = n3Parser._documentURIRoot = config.documentURI.replace(documentPart, '');
  }
  
  // Return the new `N3Parser`.
  return n3Parser;
}