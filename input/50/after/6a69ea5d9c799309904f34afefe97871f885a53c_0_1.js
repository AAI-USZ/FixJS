function () {
    if (this._isRoot) throw new Error('root has no parent');

    return Node.create(this.document, this.elem.parentNode);
  }