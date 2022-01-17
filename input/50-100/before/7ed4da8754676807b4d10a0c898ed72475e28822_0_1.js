function(node) {
  var inNode = node.hasOwnProperty.bind(node);
  return  typeof node === 'object' && 
          Seraph.nodeFlags.every(inNode) && 
          typeof node.data === 'object';
}