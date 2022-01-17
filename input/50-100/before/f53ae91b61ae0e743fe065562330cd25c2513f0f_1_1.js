function (bool) {
  if (this.isChunked) return;

  setChildModify(this.elem, bool);
}