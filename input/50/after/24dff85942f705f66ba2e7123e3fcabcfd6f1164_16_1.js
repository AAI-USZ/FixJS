  get anchor() {
    delete this._anchor;
    return this._anchor = document.getElementById('views-sublist-anchor');
  },
