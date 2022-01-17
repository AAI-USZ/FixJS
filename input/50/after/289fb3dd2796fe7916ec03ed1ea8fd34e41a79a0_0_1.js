function name (node) {
  return node.localName + (node.namespaceURI ? '(' + node.namespaceURI + ')' : '');
}