function Document(source) {

  this.writable = false;
  this.readable = true;

  // stream properties
  this.containers = [];
  this.currentPos = 0;
  this.nextPos = 0;
  this.paused = true;
  this.useStream = false;

  this.elemCache = [];
  this.nodeCache = [];

  // copy the raw content and the document tree
  if (source instanceof Document) {
    this.content = source.content;
    this.tree = copyDocument(source.tree);
  }
  // copy the raw content and parse the document content
  else {
    this.content = source;
    this.tree = parseDocument(source);
  }
}