function(node) {
  if (!node || typeof node !== 'object') {
    return false;
  }

  var inNode = node.hasOwnProperty.bind(node);
  return Seraph.nodeFlags.every(inNode) && 
         typeof node.data === 'object';
}