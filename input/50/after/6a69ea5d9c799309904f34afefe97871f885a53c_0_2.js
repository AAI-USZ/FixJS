function () {
    if (this._isSingleton) throw new Error('can not get content from singleton element');

    return this.elem.innerHTML;
  }