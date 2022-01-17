function Node(document, elem) {
    this.document = document;
    this.elem = elem;

    // precalculate these, since they in any case will be used
    this._isRoot = elem === document;

    if (this._isRoot === false) {
      this._tagName = elem.tagName.toLowerCase();
      this._isSingleton = NO_ENDING_TAG.indexOf(this._tagName) !== -1;
    } else {
      this._tagName = '';
      this._isSingleton = false;
    }

    this.isChunked = false;
    this.isContainer = false;

    // allow node object to be reused
    document.elemCache.push(elem);
    document.nodeCache.push(this);
  }