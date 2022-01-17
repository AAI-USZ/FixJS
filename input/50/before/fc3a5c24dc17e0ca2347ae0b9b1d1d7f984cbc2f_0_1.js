function () {
    if (this._isRoot) throw new Error('can not remove root element element');

    this.elem.parentNode.removeElement(this.elem);

    return this;
  }