function serialize(args) {
  var items = Array.prototype.slice.call(args);
  if(!JSON || !JSON.stringify) return items;
  for(var i = 0; i < items.length; i++) {
    if(typeof items[i] == 'object') { items[i] = JSON.stringify(items[i]); }
  }
  return items;
}