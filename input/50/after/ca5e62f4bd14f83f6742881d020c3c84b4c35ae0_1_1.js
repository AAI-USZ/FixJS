function DVS_empty() {
    this._scripts.selectedIndex = -1;

    while (this._scripts.firstChild) {
      this._scripts.removeChild(this._scripts.firstChild);
    }
  }