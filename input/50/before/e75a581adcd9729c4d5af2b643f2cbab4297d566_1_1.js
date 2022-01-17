function DVS_empty() {
    while (this._scripts.firstChild) {
      this._scripts.removeChild(this._scripts.firstChild);
    }
  }