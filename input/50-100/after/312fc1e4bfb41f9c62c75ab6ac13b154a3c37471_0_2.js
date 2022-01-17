function (content) {
  if (this.isDone) throw new Error('can not append after .done');

  if (this.elem.singleton) throw new Error('can not append to singleton element');

  this.isChunked = true;

  insertAdjacent(this, 'beforeend', content);

  return this;
}