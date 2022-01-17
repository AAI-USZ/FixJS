function serialize(args) {
  var items = Array.prototype.slice.call(args);
  if(!JSON || !JSON.stringify) return items;
  for(var i = 0; i < items.length; i++) {
    if(typeof items[i] == 'object') {
      // Buffers in Node.js look bad when stringified
      if(items[i].constructor && items[i].constructor.isBuffer) {
        items[i] = items[i].toString();
      } else {
        items[i] = JSON.stringify(items[i]);
      }
    }
  }
  return items;
}