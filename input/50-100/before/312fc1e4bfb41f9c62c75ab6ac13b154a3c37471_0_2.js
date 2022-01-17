function (content) {
  if (this.isDone) throw new Error('can not append after .done');

  var elem = this.elem;
  if (elem.singleton) throw new Error('can not append to singleton element');

  this.isChunked = true;

  insertAdjacent(this.elem, 'beforeend', content);

  return this;
}